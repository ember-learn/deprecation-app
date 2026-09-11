---
title: 'Observable mixin'
until: 8.0.0
since: 7.4.0
---

The `Observable` mixin from `@ember/object/observable` is deprecated.

`EmberObject` already includes this behavior, so the deprecation only fires when your code applies the mixin itself. That usually means one of two things:

- a class that extends `EmberObject.extend(Observable)` (redundant, since `EmberObject` already has it)
- a class that applies `Observable` to get `get`, `set`, `notifyPropertyChange`, `addObserver`, `incrementProperty`, `toggleProperty`, and friends

In both cases, the replacement is a native class with tracked properties and native property access.

### Before

```javascript
import EmberObject from '@ember/object';
import Observable from '@ember/object/observable';

export default class Counter extends EmberObject.extend(Observable) {
  count = 0;

  increment() {
    this.incrementProperty('count');
  }

  reset() {
    this.setProperties({ count: 0 });
  }
}

let counter = Counter.create();

counter.get('count'); // 0
counter.addObserver('count', () => console.log('changed'));
counter.increment();
```

### After

```javascript
import { tracked } from '@glimmer/tracking';

export default class Counter {
  @tracked count = 0;

  increment() {
    this.count++;
  }

  reset() {
    this.count = 0;
  }
}

let counter = new Counter();

counter.count; // 0
counter.increment();
```

Templates and getters that read `count` update automatically because the property is tracked. Nothing has to observe it.

### Replacing each method

| Observable method | Replacement |
| --- | --- |
| `get('foo')`, `getProperties(...)` | `this.foo` (refer to the [`get` and `set` deprecation](/id/deprecate-observable)) |
| `set('foo', v)`, `setProperties({...})` | `this.foo = v` on a `@tracked` property |
| `incrementProperty`, `decrementProperty`, `toggleProperty` | `this.foo++`, `this.foo--`, `this.foo = !this.foo` |
| `notifyPropertyChange` | Not needed. Assigning a tracked property invalidates dependents. |
| `addObserver`, `removeObserver` | Derive state with a getter instead of reacting to changes. Where a side effect is required, run it from the method that makes the change. |
| `cacheFor` | Not needed. Use `@cached` from `@glimmer/tracking` on a getter when you need memoization. |

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
