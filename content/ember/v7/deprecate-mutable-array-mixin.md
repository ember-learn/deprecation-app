---
title: 'MutableArray mixin'
until: 8.0.0
since: 7.4.0
---

The `MutableArray` mixin, exported from `@ember/array` and `@ember/array/mutable`, is deprecated. Use native arrays and native array methods instead.

`MutableArray` built on [`EmberArray`](/id/deprecate-ember-array-mixin) and added the mutation API: `pushObject`, `removeObject`, `insertAt`, `replace`, `clear`, and so on. These methods existed so the classic observer system could see array changes. With tracked arrays, native mutation is already observed.

### Before: a custom mutable collection

```javascript
import EmberObject from '@ember/object';
import MutableArray from '@ember/array/mutable';

export default class Selection extends EmberObject.extend(MutableArray) {
  items = [];

  get length() {
    return this.items.length;
  }

  objectAt(index) {
    return this.items[index];
  }

  replace(start, deleteCount, added = []) {
    this.items.splice(start, deleteCount, ...added);
    this.arrayContentDidChange(start, deleteCount, added.length);
  }
}

let selection = Selection.create();

selection.pushObject('a');
selection.addObject('a'); // no-op, already present
selection.removeObject('a');
```

### After: a tracked array

```javascript
import { trackedArray } from '@ember/reactive/collections';

let selection = trackedArray();

selection.push('a');
if (!selection.includes('a')) selection.push('a');
selection.splice(selection.indexOf('a'), 1);
```

Any template or getter that reads `selection` updates when it changes. If the values need to stay unique, `trackedSet` from the same module is a better fit than emulating `addObject`.

### Replacing each method

| MutableArray | Native |
| --- | --- |
| `pushObject(x)`, `pushObjects(arr)` | `arr.push(x)`, `arr.push(...items)` |
| `popObject()`, `shiftObject()` | `arr.pop()`, `arr.shift()` |
| `unshiftObject(x)`, `unshiftObjects(arr)` | `arr.unshift(x)`, `arr.unshift(...items)` |
| `insertAt(i, x)` | `arr.splice(i, 0, x)` |
| `removeAt(i, n)` | `arr.splice(i, n)` |
| `removeObject(x)`, `removeObjects(arr)` | `arr.splice(arr.indexOf(x), 1)`, or `removeAt` from `@ember/array` |
| `addObject(x)`, `addObjects(arr)` | `if (!arr.includes(x)) arr.push(x)`, or use a `trackedSet` |
| `replace(i, n, items)` | `arr.splice(i, n, ...items)` |
| `setObjects(items)` | `arr.splice(0, arr.length, ...items)` or assign a new array to a tracked property |
| `clear()` | `arr.length = 0` or `arr.splice(0)` |
| `reverseObjects()` | `arr.reverse()` |

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
