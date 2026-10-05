---
title: Deprecation of @ember/utils
until: 8.0.0
since: 7.5.0
---

The functions in `@ember/utils` are deprecated:

- `compare`
- `isBlank`
- `isEmpty`
- `isEqual`
- `isNone`
- `isPresent`
- `typeOf`

The `empty`, `notEmpty` and `none` computed macros from `@ember/object/computed` are also deprecated. They use `isEmpty` and `isNone`.

Use native JavaScript instead. Each of these functions accepts a value of any type. When you replace a call, check only the types that the value can have.

### `isNone`

`isNone` returns `true` for `null` and `undefined`.

Before:

```js
import { isNone } from '@ember/utils';

if (isNone(value)) {
  // ...
}
```

After:

```js
if (value === null || value === undefined) {
  // ...
}
```

### `isEmpty`

`isEmpty` returns `true` for `null`, `undefined`, an empty string, an empty array, and an object with a `size` or `length` of `0`. It returns `false` for `{}`, `0` and `false`.

Before:

```js
import { isEmpty } from '@ember/utils';

if (isEmpty(name)) {
  // ...
}

if (isEmpty(items)) {
  // ...
}
```

After:

```js
// a string, null or undefined
if (!name) {
  // ...
}

// an array, null or undefined
if (!items || items.length === 0) {
  // ...
}

// a Map or a Set, null or undefined
if (!tags || tags.size === 0) {
  // ...
}
```

### `isBlank`

`isBlank` works like `isEmpty`. It also returns `true` for a string that contains only whitespace.

Before:

```js
import { isBlank } from '@ember/utils';

if (isBlank(name)) {
  // ...
}
```

After:

```js
// a string, null or undefined
if (!name || name.trim() === '') {
  // ...
}
```

For an array, a `Map` or a `Set`, use the same checks as for `isEmpty`.

### `isPresent`

`isPresent` returns the opposite of `isBlank`.

Before:

```js
import { isPresent } from '@ember/utils';

if (isPresent(name)) {
  // ...
}

if (isPresent(items)) {
  // ...
}
```

After:

```js
// a string, null or undefined
if (name && name.trim() !== '') {
  // ...
}

// an array, null or undefined
if (items && items.length > 0) {
  // ...
}
```

`isPresent` is not the same as a truthy check. `isPresent(0)` and `isPresent(false)` return `true`. If the value can be `0` or `false`, compare it to `null` and `undefined`:

```js
if (count !== null && count !== undefined) {
  // ...
}
```

### `isEqual`

`isEqual(a, b)` does these steps:

1. If `a` has an `isEqual` method, it returns `a.isEqual(b)`.
2. If `a` and `b` are both `Date` objects, it compares their times.
3. In all other cases, it returns `a === b`.

`isEqual` never compares the items in two arrays. Two different arrays are never equal.

Before:

```js
import { isEqual } from '@ember/utils';

isEqual(a, b);
isEqual(startDate, endDate);
isEqual(person, otherPerson);
```

After:

```js
a === b;
startDate.getTime() === endDate.getTime();
person.isEqual(otherPerson);
```

### `typeOf`

Use the native check for the type name that the code compares to.

Before:

```js
import { typeOf } from '@ember/utils';

if (typeOf(value) === 'array') {
  // ...
}
```

After:

```js
if (Array.isArray(value)) {
  // ...
}
```

The native check for each result of `typeOf`:

```js
value === null; // 'null'
value === undefined; // 'undefined'
typeof value === 'string'; // 'string'
typeof value === 'number'; // 'number'
typeof value === 'boolean'; // 'boolean'
typeof value === 'function'; // 'function' and 'class'
Array.isArray(value); // 'array'
value instanceof Date; // 'date'
value instanceof RegExp; // 'regexp'
value instanceof Error; // 'error'
value instanceof FileList; // 'filelist'
value instanceof Person; // 'instance', with the class that you expect
typeof value === 'object'; // 'object', after all the other checks
```

`typeOf` returns `'string'`, `'number'` and `'boolean'` for wrapper objects such as `new String('a')`. For these objects, `typeof` returns `'object'`.

### `compare`

`compare(a, b)` returns `-1`, `0` or `1`. It orders values of different types by type first, then by value. Most code compares values of one type only. Use the comparison for that type.

Before:

```js
import { compare } from '@ember/utils';

prices.sort(compare);
names.sort(compare);
dates.sort(compare);
```

After:

```js
prices.sort((a, b) => a - b);
names.sort((a, b) => a.localeCompare(b));
dates.sort((a, b) => a.getTime() - b.getTime());
```

A sort callback can return any negative or positive number. If the code needs exactly `-1`, `0` or `1`, use `Math.sign`:

```js
let result = Math.sign(a - b);
```

### `empty`, `notEmpty` and `none` computed macros

Use a getter.

Before:

```js
import { empty, notEmpty, none } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

class TodoList {
  @tracked todos = [];
  @tracked owner = null;

  @empty('todos') isDone;
  @notEmpty('todos') hasTodos;
  @none('owner') isUnassigned;
}
```

After:

```js
import { tracked } from '@glimmer/tracking';
import { trackedArray } from '@ember/reactive/collections';

class TodoList {
  todos = trackedArray();
  @tracked owner = null;

  get isDone() {
    return this.todos.length === 0;
  }

  get hasTodos() {
    return this.todos.length > 0;
  }

  get isUnassigned() {
    return this.owner === null || this.owner === undefined;
  }
}
```

`empty` and `notEmpty` update when code changes the array with methods such as `pushObject`. A getter updates only when it reads tracked data. Keep the array in a `trackedArray`, as in the example, or assign a new array to a `@tracked` property.
