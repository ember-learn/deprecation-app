---
title: Ember.Evented and @ember/object/events
until: 8.0.0
since: 7.5.0
---

The `Ember.Evented` mixin, the underlying `@ember/object/events` module (`addListener`, `removeListener`, `sendEvent`), and the `on()` function from `@ember/object/evented` are all deprecated.

These APIs let Ember objects send and receive events. Most existing usage is not really eventing. It is one object telling another object to update state that the second object could read directly. Migrate in this order, and stop at the first step that applies:

1. Derive the state. Replace the event and the listener's copy of the state with a getter that reads tracked state from the source. This removes the subscription entirely.
2. Call the method directly. When the emitter already knows its one consumer, an event adds indirection without decoupling anything.
3. Use an event emitter library. Only when the emitter must not know who is listening.

One usage does not fit that list. If you subscribed to a classic component's own lifecycle, such as `this.on('didInsertElement', ...)`, refer to the section on classic component lifecycle hooks below.

The methods from `Evented` (`on`, `one`, `off`, `trigger`, `has`) were also available on `Ember.Component`, `Ember.Route`, and `Ember.Router`. Usage on these objects is deprecated. The `RouterService` keeps these methods, and they are not deprecated there, because key parts of its functionality are difficult to reproduce without them.

### Prefer derived state

Events were commonly used to push a value from one object into another so that the second object could re-render. Tracked properties already do this. The listener needs neither its own copy of the value nor a subscription. It reads the value from the source, and Ember invalidates whatever consumed it.

This session service uses `Evented` to announce a login:

#### Before

```javascript
// app/services/session.js
import Service from '@ember/service';
import Evented from '@ember/object/evented';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service.extend(Evented) {
  @tracked user = null;

  login(userData) {
    this.user = userData;
    this.trigger('loggedIn', userData);
  }

  logout() {
    const oldUser = this.user;
    this.user = null;
    this.trigger('loggedOut', oldUser);
  }
}
```

```gjs
// app/components/greeting.gjs
import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';

export default class Greeting extends Component {
  @service session;

  @tracked greeting = 'Please sign in';

  constructor(owner, args) {
    super(owner, args);
    this.session.on('loggedIn', this, 'handleLogin');
    this.session.on('loggedOut', this, 'handleLogout');

    registerDestructor(this, () => {
      this.session.off('loggedIn', this, 'handleLogin');
      this.session.off('loggedOut', this, 'handleLogout');
    });
  }

  handleLogin(user) {
    this.greeting = `Welcome back, ${user.name}`;
  }

  handleLogout() {
    this.greeting = 'Please sign in';
  }

  <template>{{this.greeting}}</template>
}
```

The service owns the tracked state. The component derives from it:

#### After

```javascript
// app/services/session.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service {
  @tracked user = null;

  login(userData) {
    this.user = userData;
  }

  logout() {
    this.user = null;
  }
}
```

```gjs
// app/components/greeting.gjs
import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class Greeting extends Component {
  @service session;

  get greeting() {
    let { user } = this.session;

    return user ? `Welcome back, ${user.name}` : 'Please sign in';
  }

  <template>{{this.greeting}}</template>
}
```

Often the getter is not needed either, because the template can derive the value:

```gjs
<template>
  {{#if this.session.user}}
    Welcome back, {{this.session.user.name}}
  {{else}}
    Please sign in
  {{/if}}
</template>
```

The same rewrite applies to state computed from the event payload. A component that listened for `recordsLoaded` to recount a list can read the list and count it in a getter:

```javascript
get completedCount() {
  return this.todos.items.filter((item) => item.isComplete).length;
}
```

### Call methods directly

Sometimes an event does trigger real work rather than a state update, such as clearing a cache or starting a request. If the object that triggers the event already knows the object that handles it, replace the event with a method call:

#### Before

```javascript
// app/services/session.js
export default class SessionService extends Service.extend(Evented) {
  logout() {
    this.user = null;
    this.trigger('loggedOut');
  }
}

// app/services/cart.js
export default class CartService extends Service {
  @service session;

  constructor() {
    super(...arguments);
    this.session.on('loggedOut', this, 'clear');
  }

  clear() { /* ... */ }
}
```

#### After

```javascript
// app/services/session.js
export default class SessionService extends Service {
  @service cart;

  logout() {
    this.user = null;
    this.cart.clear();
  }
}

// app/services/cart.js
export default class CartService extends Service {
  clear() { /* ... */ }
}
```

The call is type-safe. Also, `logout` now states what it does instead of hiding the wiring in a subscription registered somewhere else.

### Routes and the router

`Route` and `Router` also mixed in `Evented`, and routes trigger their lifecycle hooks as events. To migrate a subscription to a route's own events, override the hook:

#### Before

```javascript
// app/routes/dashboard.js
import Route from '@ember/routing/route';

export default class DashboardRoute extends Route {
  init() {
    super.init(...arguments);
    this.on('activate', this, this.startPolling);
    this.on('deactivate', this, this.stopPolling);
  }
}
```

#### After

```javascript
// app/routes/dashboard.js
import Route from '@ember/routing/route';

export default class DashboardRoute extends Route {
  activate() {
    super.activate(...arguments);
    this.startPolling();
  }

  deactivate() {
    super.deactivate(...arguments);
    this.stopPolling();
  }
}
```

To listen for transitions such as `didTransition` and `willTransition` on the `router:main` object, use the `router` service instead. It emits `routeWillChange` and `routeDidChange`, and its `on`, `off`, and `one` methods are not deprecated:

```javascript
// app/services/page-views.js
import Service, { service } from '@ember/service';

export default class PageViewsService extends Service {
  @service router;

  constructor() {
    super(...arguments);
    this.router.on('routeDidChange', this, this.track);
  }

  track(transition) { /* ... */ }
}
```

### Addons

Some addons exposed `Evented` objects. Your code can call `.on(...)` on one of them without any `Evented` code of your own. The most common case is the `session` service from [ember-simple-auth](https://github.com/mainmatter/ember-simple-auth), where code subscribed to `authenticationSucceeded` and `invalidationSucceeded`. Recent releases of ember-simple-auth no longer use `Evented` for the session service. Upgrade the addon and follow its release notes for the replacement API, rather than writing your own emitter around it.

### Use an event emitter library

Reach for a library only when the first two steps do not apply. That is, the set of subscribers is open, and the emitter must not know who is listening. The public API of an addon is the common case.

We recommend a modern asynchronous library like [emittery](https://www.npmjs.com/package/emittery). To keep synchronous semantics, use a library such as [`nanoevents`](https://www.npmjs.com/package/nanoevents) or [`mitt`](https://www.npmjs.com/package/mitt).

> Important: `Ember.Evented` emits events _synchronously_. A move to a library with asynchronous behavior is recommended, but it can cause subtle changes in the behavior of your application.

First, add `emittery` to your project:

```bash
pnpm add emittery
```

Using the session service again, the service manages its own event emitter and provides clear methods for subscribing.

#### Before

```javascript
// app/services/session.js
import Service from '@ember/service';
import Evented from '@ember/object/evented';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service.extend(Evented) {
  @tracked user = null;

  login(userData) {
    this.user = userData;
    this.trigger('loggedIn', userData);
  }

  logout() {
    const oldUser = this.user;
    this.user = null;
    this.trigger('loggedOut', oldUser);
  }
}
```

A consumer can use it like this:

```javascript
// app/components/some-component.js
import Component from '@glimmer/component';
import { service } from '@ember/service';
import { registerDestructor } from '@ember/destroyable';

export default class SomeComponent extends Component {
  @service session;

  constructor(owner, args) {
    super(owner, args);
    this.session.on('loggedIn', this, 'handleLogin');

    registerDestructor(this, () => {
      this.session.off('loggedIn', this, 'handleLogin');
    });
  }

  handleLogin(user) {
    console.log(`User logged in: ${user.name}`);
    // ... update component state
  }
}
```

#### After

```javascript
// app/services/session.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Emittery from 'emittery';

export default class SessionService extends Service {
  @tracked user = null;

  #emitter = new Emittery();

  login(userData) {
    this.user = userData;
    this.#emitter.emit('loggedIn', userData);
  }

  logout() {
    const oldUser = this.user;
    this.user = null;
    this.#emitter.emit('loggedOut', oldUser);
  }

  onLoggedIn(callback) {
    return this.#emitter.on('loggedIn', callback);
  }

  onLoggedOut(callback) {
    return this.#emitter.on('loggedOut', callback);
  }
}
```

The listener can then use `registerDestructor` from `@ember/destroyable` to tie the lifetime of the subscription to its own. No `willDestroy` hook or manual cleanup is necessary.

```javascript
// app/components/some-component.js
import Component from '@glimmer/component';
import { service } from '@ember/service';
import { registerDestructor } from '@ember/destroyable';

export default class SomeComponent extends Component {
  @service session;

  constructor(owner, args) {
    super(owner, args);

    const unsubscribe = this.session.onLoggedIn((user) => {
      this.handleLogin(user);
    });

    registerDestructor(this, unsubscribe);
  }

  handleLogin(user) {
    console.log(`User logged in: ${user.name}`);
    // ... update component state
  }
}
```

#### Test waiters

With synchronous events, tests did not need to wait for listeners. Asynchronous listeners run after `emit` returns. `settled()` does not know about them, and neither do the DOM helpers that call it, such as `click()`. A test can then make assertions before the listeners finish.

`emit` from `emittery` returns a promise that resolves when all listeners finish. Wrap that promise in `waitForPromise` from `@ember/test-waiters` so that `settled()` waits for it:

```javascript
import { waitForPromise } from '@ember/test-waiters';

// in the service
login(userData) {
  this.user = userData;
  waitForPromise(this.#emitter.emit('loggedIn', userData));
}
```

The same pattern works for other asynchronous libraries that return a promise from their emit method.

### Classic component lifecycle hooks

`@ember/component` mixes in `Evented`, so a classic component could subscribe to its own lifecycle with `this.on(...)`. Each lifecycle hook was also triggered as an event. This made `this.on(...)` look like a way to register setup and teardown without overriding the hook. `@ember/component` is itself being phased out, so the migration below moves off it, and not only off `Evented`.

#### Before

```javascript
// app/components/chart.js
import Component from '@ember/component';

export default class ChartComponent extends Component {
  init() {
    super.init(...arguments);

    this.on('didInsertElement', this, this.setupChart);
    this.on('willDestroyElement', this, this.teardownChart);
  }

  setupChart() {
    this.chart = new Chart(this.element, this.data);
  }

  teardownChart() {
    this.chart.destroy();
  }
}
```

Code that used the imported `on()` from `@ember/object/evented` did the same thing, written as `setupChart: on('didInsertElement', function () { ... })`. Both forms migrate the same way.

The recommended migration is to replace `@ember/component` with `@glimmer/component`. Glimmer components have no DOM lifecycle hooks. DOM setup and teardown belong in a modifier, which ties the work to the element rather than to the component. This also removes the wrapper element and the two-way bindings of classic components.

Move the DOM work into a modifier. The function it returns is the teardown, so `willDestroyElement` has no counterpart to write:

#### After

```gjs
// app/components/chart.gjs
import { modifier } from 'ember-modifier';

const chart = modifier((element, [data]) => {
  const instance = new Chart(element, data);

  return () => instance.destroy();
});

<template>
  <div {{chart @data}}></div>
</template>
```

The component class is gone. If the component holds other state, it becomes a Glimmer component class with the same template.

This is where each classic hook goes:

- `init`: the `constructor`
- `didReceiveAttrs`: a getter that derives from `this.args`
- `didInsertElement`: the body of a modifier
- `didRender`, `didUpdate`: a modifier that re-runs when its arguments change
- `willDestroyElement`: the teardown function returned by the modifier
- `willDestroy`: `registerDestructor` from `@ember/destroyable`

If you cannot move to `@glimmer/component` yet, you can still remove the deprecated subscription today. The component already calls every hook in that list on itself, so override the hook rather than listening for it:

```javascript
// app/components/chart.js
import Component from '@ember/component';

export default class ChartComponent extends Component {
  didInsertElement() {
    super.didInsertElement(...arguments);
    this.chart = new Chart(this.element, this.data);
  }

  willDestroyElement() {
    this.chart.destroy();
    super.willDestroyElement(...arguments);
  }
}
```

That clears the deprecation, and the move to `@glimmer/component` stays a separate change. Components written with `Component.extend({ ... })` follow the same rule. Define `didInsertElement` and `willDestroyElement` in the `extend` hash, call `this._super(...arguments)`, and remove the `this.on(...)` calls.

`Evented` on a component also let the component announce its own events with `this.trigger(...)`, for a parent to receive with `this.on(...)`:

```javascript
// app/components/item-list.js
import Component from '@ember/component';
import { action } from '@ember/object';

export default class ItemListComponent extends Component {
  @action
  selectItem(item) {
    this.selected = item;
    this.trigger('itemSelected', item);
  }
}
```

Pass a callback down as an argument instead. The parent supplies the handler at the call site, so the wiring is visible in the template:

```gjs
// app/components/item-list.gjs
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

export default class ItemList extends Component {
  @action
  selectItem(item) {
    this.args.onSelect?.(item);
  }

  <template>
    {{#each @items as |item|}}
      <button type="button" {{on "click" (fn this.selectItem item)}}>
        {{item.name}}
      </button>
    {{/each}}
  </template>
}
```

```gjs
<template>
  <ItemList @items={{this.items}} @onSelect={{this.handleSelect}} />
</template>
```
