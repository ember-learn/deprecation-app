---
title: Deprecation of @ember/object/observers
until: 7.0.0
since: 6.5.0
---

The `addObserver` and `removeObserver` methods from `@ember/object/observers` are deprecated. Instead of using observers, you should use tracked properties and native getters/setters.

### Before

```javascript
import EmberObject from '@ember/object';
import { addObserver, removeObserver } from '@ember/object/observers';

const Person = EmberObject.extend({
  firstName: null,
  lastName: null,

  fullName: null,

  fullNameDidChange: function() {
    this.set('fullName', `${this.get('firstName')} ${this.get('lastName')}`);
  }.observes('firstName', 'lastName'),
});

let person = Person.create({ firstName: 'John', lastName: 'Doe' });

addObserver(person, 'fullName', () => {
  console.log('Full name changed!');
});

person.set('firstName', 'Jane');

removeObserver(person, 'fullName', null, 'fullNameDidChange');
```

### After

```javascript
import { tracked } from '@glimmer/tracking';

class Person {
  @tracked firstName;
  @tracked lastName;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

let person = new Person('John', 'Doe');
console.log(person.fullName); // John Doe

person.firstName = 'Jane';
console.log(person.fullName); // Jane Doe
```

### Handling Observers with Side Effects

Observers are sometimes used to trigger side effects, such as logging or making a network request, when a property changes. The modern approach is to encapsulate these side effects in methods that are called explicitly.

**Before: Observer with a Side Effect**

```javascript
import EmberObject from '@ember/object';

const User = EmberObject.extend({
  username: null,
  lastLogin: null,

  lastLoginChanged: function() {
    console.log(`User ${this.get('username')} logged in at ${this.get('lastLogin')}`);
  }.observes('lastLogin')
});

const user = User.create({ username: 'johndoe' });
user.set('lastLogin', new Date()); // This triggers the observer
```

**After: Explicit Method for the Side Effect**

With modern class-based components, you would create a method that updates the property and performs the side effect. This makes the code's behavior much clearer.

```javascript
import { tracked } from '@glimmer/tracking';

class User {
  @tracked username;
  @tracked lastLogin;

  constructor(username) {
    this.username = username;
  }

  // An explicit action that updates the property and causes the side effect
  login() {
    this.lastLogin = new Date();
    this.logLogin();
  }

  logLogin() {
    console.log(`User ${this.username} logged in at ${this.lastLogin}`);
  }
}

const user = new User('johndoe');
user.login(); // Call the method to trigger the update and the side effect
```

### Replacing Observers with Modifiers

In legacy components, observers were often used to react to changes in component arguments (`@args`). This pattern can now be replaced with modifiers, which provide a cleaner, more reusable, and more idiomatic way to manage side effects related to DOM elements and argument changes.

**Before: Observer on a Component Argument**

Here is an example of a classic component that uses an observer to update a third-party charting library whenever its `data` argument changes.

```javascript
// Classic Component JS
import Component from '@ember/component';
import { observer } from '@ember/object';
import Chart from 'chart.js'; // A third-party library

export default Component.extend({
  tagName: 'canvas',
  chart: null,

  // 1. Create the chart when the element is inserted
  didInsertElement() {
    this._super(...arguments);
    this.chart = new Chart(this.element, {
      type: 'bar',
      data: this.get('data')
    });
  },

  // 2. Observe the 'data' property for changes
  dataDidChange: observer('data', function() {
    if (this.chart) {
      this.chart.data = this.get('data');
      this.chart.update();
    }
  }),

  // 3. Clean up when the component is destroyed
  willDestroyElement() {
    this._super(...arguments);
    if (this.chart) {
        this.chart.destroy();
    }
  }
});
```

**After: Using a Modifier**

In modern Ember, this logic can be encapsulated in a modifier. The modifier has direct access to the element and can react to argument changes, handling setup, updates, and teardown cleanly.

First, create a modifier file:

```javascript
// app/modifiers/update-chart.js
import { modifier } from 'ember-modifier';
import Chart from 'chart.js';

export default modifier(function updateChart(element, [data]) {
  // This function runs whenever `data` changes.

  // Get the chart instance, or create it if it doesn't exist.
  // Storing the instance on the element is a common pattern.
  let chart = element.chart;

  if (!chart) {
    // Create chart on first render
    chart = new Chart(element, {
      type: 'bar',
      data: data
    });
    element.chart = chart;
  } else {
    // Update chart on subsequent renders
    chart.data = data;
    chart.update();
  }

  // The return function is a destructor, which handles cleanup.
  return () => {
    if (element.chart) {
      element.chart.destroy();
      element.chart = null;
    }
  };
});
```

Then, use this modifier in your Glimmer component's template:

```hbs
{{! The component template }}
<canvas {{update-chart @data}}></canvas>
```

This approach is much cleaner because:
1.  The logic is reusable and not tied to a specific component.
2.  It clearly separates the component's data and template from the DOM-specific logic.
3.  The modifier's lifecycle (setup, update, teardown) is managed by Ember, making it more robust.

### Replacing Observer-Based Waiting Patterns

Sometimes observers were used not just to mirror state into another property or invoke a side effect immediately, but to "wait" until a property reached a certain condition (e.g. became non-null / a flag flipped) and then continue logic. Instead of wiring an observer that removes itself when the predicate passes, choose one of these approaches:

#### 1. Prefer Reactive Rendering (Often You Need Nothing Extra)

If the goal is just to show different UI when something becomes ready, branch in the template:

```hbs
{{#if this.isReady}}
  <LoadedState @data={{this.data}} />
{{else}}
  <LoadingSpinner />
{{/if}}
```

`this.isReady` should be a `@tracked` property (or derived from other tracked state). No explicit watcher is required; changes trigger re-render automatically.

#### 2. requestAnimationFrame Polling (UI-Frame Cadence)

Use when a rapidly changing UI-related value will settle soon and you want per-frame checks without observers:

```js
export class RafWaiter {
  constructor(object, key, predicate, callback, { maxFrames = Infinity } = {}) {
    this.object = object;
    this.key = key;
    this.predicate = predicate;
    this.callback = callback;
    this.maxFrames = maxFrames;
    this._frame = 0;
    this._stopped = false;
  }

  start() {
    const tick = () => {
      if (this._stopped) return;
      let value = this.object[this.key];
      if (this.predicate(value)) {
        this.callback(value);
        this.stop();
        return;
      }
      if (++this._frame < this.maxFrames) {
        this._rafId = requestAnimationFrame(tick);
      }
    };
    tick(); // initial synchronous check
    return () => this.stop();
  }

  stop() {
    this._stopped = true;
    if (this._rafId) cancelAnimationFrame(this._rafId);
  }
}

// Usage:
// const cancel = new RafWaiter(model, 'isReady', v => v === true, value => doSomething(value)).start();
```

#### 3. ember-concurrency Task (Interval / Backoff Friendly)

Provides structured cancellation and adjustable cadence; integrate with destruction for safety.

```js
import { task, timeout } from 'ember-concurrency';
import { registerDestructor } from '@ember/destroyable';

class WaitServiceLike {
  constructor(object) {
    this.object = object;
    registerDestructor(this, () => this.waitFor?.cancelAll?.());
  }

  waitFor = task(async (key, predicate, { interval = 50, maxChecks = Infinity } = {}) => {
    let checks = 0;
    while (checks < maxChecks) {
      let value = this.object[key];
      if (predicate(value)) {
        return value;
      }
      checks++;
      await timeout(interval);
    }
    throw new Error('Condition not met before maxChecks');
  });
}

// Usage:
// let waiter = new WaitServiceLike(model);
// let result = await waiter.waitFor.perform('isReady', v => v === true, { interval: 30 });
```

#### Choosing an Approach

- Template branching: simplest; no manual cleanup.
- `requestAnimationFrame`: sync with paint loop for short-lived UI readiness waits.
- `ember-concurrency` task: tunable intervals, cancellation, good for async processes.

Avoid reimplementing implicit observer semantics. Favor explicit state + rendering or cancellable tasks.
