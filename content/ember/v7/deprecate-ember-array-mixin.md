---
title: 'EmberArray mixin'
until: 8.0.0
since: 7.4.0
---

The `EmberArray` mixin, the default export of `@ember/array`, is deprecated. Use native arrays and native array methods instead.

`EmberArray` provided a read-only array API (`firstObject`, `objectAt`, `mapBy`, `filterBy`, `findBy`, `sortBy`, `uniq`, `compact`, `without`, and so on) for any object that exposed `length` and `objectAt`. Every one of those has a native equivalent.

### Before: a custom array-like class

```javascript
import EmberObject from '@ember/object';
import EmberArray from '@ember/array';

export default class Pages extends EmberObject.extend(EmberArray) {
  pages = [];

  get length() {
    return this.pages.length;
  }

  objectAt(index) {
    return this.pages[index];
  }
}

let pages = Pages.create({ pages: [{ title: 'Intro' }, { title: 'Setup' }] });

pages.get('firstObject').title; // 'Intro'
pages.mapBy('title'); // ['Intro', 'Setup']
```

### After: a native array

Most of the time the class only existed to give an array the Ember API. Drop the wrapper and use the array:

```javascript
let pages = [{ title: 'Intro' }, { title: 'Setup' }];

pages[0].title; // 'Intro'
pages.map((page) => page.title); // ['Intro', 'Setup']
```

If the collection drives UI updates, wrap it with `trackedArray` from [`@ember/reactive/collections`](https://api.emberjs.com/ember/release/modules/@ember%2Freactive%2Fcollections/) so mutations re-render:

```javascript
import { trackedArray } from '@ember/reactive/collections';

let pages = trackedArray([{ title: 'Intro' }, { title: 'Setup' }]);
```

If the class has its own API and only needs to be iterable, implement the [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) instead:

```javascript
export default class Pages {
  #pages = [];

  *[Symbol.iterator]() {
    yield* this.#pages;
  }
}
```

### Replacing each method

| EmberArray | Native |
| --- | --- |
| `firstObject`, `lastObject` | `arr[0]`, `arr.at(-1)` |
| `objectAt(i)`, `objectsAt([i, j])` | `arr[i]`, `[i, j].map((i) => arr[i])` |
| `mapBy('k')`, `getEach('k')` | `arr.map((x) => x.k)` |
| `filterBy('k', v)`, `rejectBy('k', v)` | `arr.filter((x) => x.k === v)`, `arr.filter((x) => x.k !== v)` |
| `findBy('k', v)` | `arr.find((x) => x.k === v)` |
| `isAny('k', v)`, `isEvery('k', v)` | `arr.some((x) => x.k === v)`, `arr.every((x) => x.k === v)` |
| `sortBy('k')` | `arr.toSorted((a, b) => compare(a.k, b.k))` with `compare` from `@ember/utils` |
| `uniq()`, `uniqBy('k')` | `Array.from(new Set(arr))`, `uniqBy` from `@ember/array` or a small helper |
| `compact()` | `arr.filter((x) => x != null)` |
| `without(x)` | `arr.filter((y) => y !== x)` |
| `invoke('m', ...args)` | `arr.map((x) => x.m(...args))` |
| `toArray()` | `Array.from(arr)` |
| `any(fn)`, `every(fn)`, `find(fn)`, `includes(x)` | same names on `Array.prototype` |

Reactivity note: `sortBy`, `filterBy`, and friends were often used inside computed properties with `[]` or `@each` dependent keys. With tracked arrays, a plain getter that calls the native method re-computes on its own.

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
