---
title: Deprecation of @ember/array Read Methods
until: "6.0"
since: "5.8"
displayId: array.read-methods
---

All read-only methods and computed properties from `@ember/array` are deprecated. You should use native JavaScript array methods and properties instead. This guide covers the common read-only APIs and their native equivalents.

### `firstObject` and `lastObject`

These computed properties provided safe access to the first and last elements of an array.

**Before**
```javascript
import { A } from '@ember/array';
let arr = A(['a', 'b', 'c']);
let first = arr.get('firstObject'); // 'a'
let last = arr.get('lastObject');   // 'c'
```

**After**
Use native array bracket notation, or the `at()` method for accessing elements from the end of the array.

```javascript
let arr = ['a', 'b', 'c'];
let first = arr[0];
let last = arr.at(-1);
```

### `objectAt` and `objectsAt`

These methods provided safe, index-based access to array elements.

**Before**
```javascript
import { A } from '@ember/array';
let arr = A(['a', 'b', 'c']);
let middle = arr.objectAt(1);     // 'b'
let some = arr.objectsAt([0, 2]); // ['a', 'c']
```

**After**
Use native array bracket notation for `objectAt`. For `objectsAt`, you can use `map`.

```javascript
let arr = ['a', 'b', 'c'];
let middle = arr[1];
let some = [0, 2].map(index => arr[index]);
```

### `mapBy`, `filterBy`, `rejectBy`, `findBy`

These methods were shortcuts for common mapping and filtering operations on arrays of objects.

**Before**
```javascript
import { A } from '@ember/array';
let users = A([
  { name: 'John', isActive: true },
  { name: 'Jane', isActive: false },
]);
let names = users.mapBy('name');
let active = users.filterBy('isActive', true);
let john = users.findBy('name', 'John');
```

**After**
Use the native `map`, `filter`, and `find` methods with arrow functions.

```javascript
let users = [
  { name: 'John', isActive: true },
  { name: 'Jane', isActive: false },
];
let names = users.map(user => user.name);
let active = users.filter(user => user.isActive === true);
let john = users.find(user => user.name === 'John');
```

### `uniqBy`

`uniqBy` created a new array with unique elements based on a property.

**Before**
```javascript
import { uniqBy } from '@ember/array';
let users = [{ id: 1 }, { id: 2 }, { id: 1 }];
let unique = uniqBy(users, 'id');
```

**After**
Use a `Map` to efficiently create a unique list.

```javascript
let users = [{ id: 1 }, { id: 2 }, { id: 1 }];
let unique = Array.from(
  users.reduce((map, user) => map.set(user.id, user), new Map()).values()
);
```

