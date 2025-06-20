---
title: Deprecation of @ember/array Write Methods
until: "6.0"
since: "5.8"
displayId: array.write-methods
---

All methods from `@ember/array` that mutate or "write" to an array are deprecated. This includes observable methods like `pushObject`.

The modern approach is to use `TrackedArray` from the [`tracked-built-ins`](https://github.com/tracked-tools/tracked-built-ins) addon. This class provides a tracked version of the native JavaScript `Array` that can be mutated directly, and these mutations will be tracked automatically.

First, install the addon:

```bash
ember install tracked-built-ins
```

### Observable Write Methods

Methods like `pushObject`, `popObject`, `removeObject`, `insertAt`, and `removeAt` were used to modify arrays in a way that Ember's classic observability system could track.

**Before**
```javascript
import { A } from '@ember/array';
let arr = A([1, 2, 3]);

arr.pushObject(4);
arr.removeAt(1, 1); // remove 1 item at index 1
```

**After**
Use `TrackedArray` and mutate it directly with standard JavaScript array methods. Using `TrackedArray` provides an ergonomic API that is nearly identical to working with plain JavaScript arrays, while providing the reactivity needed for your application's UI to update automatically.

```javascript
import { TrackedArray } from 'tracked-built-ins';

// In a component or class
class MyComponent {
  myArray = new TrackedArray([1, 2, 3]);

  addItem() {
    // pushObject -> push
    this.myArray.push(4);
  }

  removeItem() {
    // removeAt -> splice
    this.myArray.splice(1, 1);
  }

  clearItems() {
    // clear -> set length to 0
    this.myArray.length = 0;
  }
}
```

This pattern applies to all mutation methods. Here is a brief mapping for the most common methods:

| `@ember/array` Method | Native `TrackedArray` Method |
|-----------------------|------------------------------|
| `pushObject(s)`       | `push` / `...` (spread)      |
| `popObject()`         | `pop`                        |
| `shiftObject()`       | `shift`                      |
| `unshiftObject(s)`    | `unshift`                    |
| `insertAt(idx, obj)`  | `splice(idx, 0, obj)`        |
| `removeAt(idx, len)`  | `splice(idx, len)`           |
| `clear()`             | `length = 0`                 |
| `replace()`           | `splice`                     |

### Handling Uniqueness and Specific Objects

For methods like `addObject` and `removeObject` that deal with specific object instances or uniqueness, you need a bit more logic.

```javascript
// In your component class with `myArray = new TrackedArray([...])`

// removeObject replacement
removeItem(item) {
  const index = this.myArray.indexOf(item);
  if (index > -1) {
    this.myArray.splice(index, 1);
  }
}

// addObject replacement
addUniqueItem(item) {
  if (!this.myArray.includes(item)) {
    this.myArray.push(item);
  }
}
```

Alternatively, if you are working with a list that must be unique, consider using a `Set` or `TrackedSet` from `tracked-built-ins`, as they handle uniqueness automatically.
