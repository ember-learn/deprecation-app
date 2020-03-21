---
id: array.new-array-wrapper
title: Deprecate calling `A` as a constructor
until: '3.9.0'
since: '3.6'
---

The `A` function imported from `@ember/array` is a function that can be used
to apply array mixins to an existing object (generally a native array):

```js
import { A } from '@ember/array';

let arr = [];

A(arr);

arr.pushObject(1);
```

`A` will also return the "wrapped" array for convenience, and if no array is
passed will create the array instead:

```js
let arr1 = A([]);
let arr2 = A();
```

Because `A` is a standard function, it can also be used as a constructor. The
constructor does not actually do anything different (because Javascript
constructors can return something other than an instance). This was not intended
behavior - `A` was originally implemented as an arrow function which cannot be
used as a constructor, but as a side effect of transpilation it was turned into
a normal function which could.

To update, remove any usage of `new` with `A`, and call `A` as a standard
function. Before:

```js
let arr = new A();
```

After:

```js
let arr = A();
```

If linting rules prevent you from doing this, rename `A` to indicate that it is
a function and not a constructor:

```js
import { A as emberA } from '@ember/array';

let arr = emberA();
```
