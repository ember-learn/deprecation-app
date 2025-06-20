---
title: Deprecation of @ember/array Foundation APIs
until: "6.0"
since: "5.8"
displayId: array.foundations
---

The foundational APIs of `@ember/array`, including the `A()` function and the core mixins (`EmberArray`, `MutableArray`, `NativeArray`), are deprecated. These were used to create and extend arrays with Ember's observability. The modern approach is to use native JavaScript arrays, and `TrackedArray` from `tracked-built-ins` when reactivity is needed.

### `A()` Function and Core Mixins

The `A()` function would wrap a native array, making it an `EmberArray`. The `EmberArray` and `MutableArray` mixins could be used to build custom array-like classes.

**Before**
```javascript
import { A } from '@ember/array';
import EmberObject from '@ember/object';
import { MutableArray } from '@ember/array';

let emberArr = A([1, 2, 3]);
emberArr.pushObject(4);

const MyArray = EmberObject.extend(MutableArray, {
  // ... implementation ...
});
```

**After**
Use native arrays for standard array operations. For arrays that need to be tracked for reactivity in components and other classes, use `TrackedArray` from the `tracked-built-ins` addon.

```javascript
// For a standard array
let nativeArr = [1, 2, 3];
nativeArr.push(4);

// For a tracked array
import { TrackedArray } from 'tracked-built-ins';
let trackedArr = new TrackedArray([1, 2, 3]);
trackedArr.push(4); // This mutation is tracked
```

### Utility Functions: `isArray` and `makeArray`

These functions helped create and check for arrays.

**Before**
```javascript
import { isArray, makeArray } from '@ember/array';
let isArr = isArray([]);
let ensuredArr = makeArray('hello');
```

**After**
Use native JavaScript equivalents.

```javascript
// isArray() -> Array.isArray()
let isArr = Array.isArray([]);

// makeArray() -> custom helper or ensure data is correct
function ensureArray(value) {
  if (value === null || value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}
let ensuredArr = ensureArray('hello');
```

### Creating Custom Arrays with Proxies

For advanced use cases where you might have created a custom class based on `MutableArray` to add special behaviors to your array, the modern JavaScript equivalent is to use a `Proxy`. A `Proxy` object allows you to intercept and redefine fundamental operations for a target object (like an array), enabling you to create powerful custom wrappers.

**Example: A Logging Array**

Imagine you want to log every time an item is pushed to an array.

**Before**, you might have done this with `MutableArray`:

```javascript
import EmberObject from '@ember/object';
import { MutableArray } from '@ember/array';

const LoggingArray = EmberObject.extend(MutableArray, {
  // Internal content array
  _content: null,

  init() {
    this._super(...arguments);
    this._content = this._content || [];
  },

  // Required primitives
  objectAt(idx) { return this._content[idx]; },
  get length() { return this._content.length; },

  // Override replace to add logging
  replace(idx, amt, objects) {
    if (amt === 0) {
      console.log(`Adding items: ${objects.join(', ')}`);
    }
    this._content.splice(idx, amt, ...objects);
    this.arrayContentDidChange(idx, amt, objects.length);
  }
});

let arr = LoggingArray.create({ _content: [1, 2] });
arr.pushObject(3); // Logs: "Adding items: 3"
```

**After**, you can achieve the same result more cleanly by wrapping a `TrackedArray` in a `Proxy`. This allows you to add custom behavior while preserving the reactivity provided by `TrackedArray`.

```javascript
import { TrackedArray } from 'tracked-built-ins';

function createTrackedLoggingArray(initialItems) {
  // Start with a TrackedArray instance
  const trackedArr = new TrackedArray(initialItems);

  return new Proxy(trackedArr, {
    get(target, prop, receiver) {
      // Intercept the 'push' method
      if (prop === 'push') {
        return function(...args) {
          console.log(`Adding items via push: ${args.join(', ')}`);
          // Call the original push method on the TrackedArray
          // This will trigger reactivity automatically.
          return target.push(...args);
        }
      }

      // Forward all other property access and method calls to the TrackedArray
      const value = Reflect.get(target, prop, receiver);
      return typeof value === 'function' ? value.bind(target) : value;
    },

    set(target, prop, value, receiver) {
      // Intercept direct index assignment
      if (!isNaN(parseInt(prop, 10))) {
        console.log(`Setting index ${prop} to ${value}`);
      }
      // Forward the set operation to the TrackedArray to trigger reactivity
      return Reflect.set(target, prop, value, receiver);
    }
  });
}

// In a component:
class MyComponent {
  loggingArray = createTrackedLoggingArray([1, 2]);

  addItem() {
    this.loggingArray.push(3); // Logs and triggers an update
  }

  updateItem() {
    this.loggingArray[0] = 'new value'; // Logs and triggers an update
  }
}
```

This `Proxy` approach is very powerful. By wrapping a `TrackedArray`, you can layer in custom logic while letting it handle the complexities of reactivity. This is the recommended pattern for creating advanced, observable array-like objects in modern Ember.
