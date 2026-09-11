---
title: 'Enumerable and MutableEnumerable'
until: 8.0.0
since: 7.4.0
---

`Enumerable` from `@ember/enumerable` and `MutableEnumerable` from `@ember/enumerable/mutable` are deprecated.

These mixins have been empty for a long time. The mixins were kept only so that existing `.detect()` checks kept working. They are now deprecated along with the rest of the mixin system.

### Replacing `.detect()` checks

`Enumerable.detect(value)` answered "can I treat this value as a list?". Check for the capability you need instead.

Before:

```javascript
import Enumerable from '@ember/enumerable';

function printAll(maybeList) {
  if (Enumerable.detect(maybeList)) {
    maybeList.forEach((item) => console.log(item));
  }
}
```

After, for arrays:

```javascript
function printAll(maybeList) {
  if (Array.isArray(maybeList)) {
    maybeList.forEach((item) => console.log(item));
  }
}
```

Or, to accept any iterable (`Map`, `Set`, generators, and so on):

```javascript
function printAll(maybeList) {
  if (typeof maybeList?.[Symbol.iterator] === 'function') {
    for (let item of maybeList) {
      console.log(item);
    }
  }
}
```

### Replacing custom enumerable classes

If you built a custom collection class with these mixins (usually through `EmberArray` or `MutableArray`), switch to a native array, or to `trackedArray` from [@ember/reactive/collections](https://api.emberjs.com/ember/release/modules/@ember%2Freactive%2Fcollections/) when the collection drives UI updates.

For collection classes with their own API, implement the [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) so consumers can use `for...of`, spread, and `Array.from`:

```javascript
class Queue {
  #items = [];

  add(item) {
    this.#items.push(item);
  }

  *[Symbol.iterator]() {
    yield* this.#items;
  }
}

let queue = new Queue();
queue.add('a');
queue.add('b');

[...queue]; // ['a', 'b']
```

The enumerable methods themselves (`firstObject`, `mapBy`, `pushObject`, and friends) live on `EmberArray` and `MutableArray`, which are deprecated as well. Replace them with native equivalents such as `arr[0]`, `map`, and `push`, using `trackedArray` where mutation needs to be tracked.

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
