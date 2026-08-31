---
title: Deprecate Comparable mixin
until: 8.0.0
since: 7.2.0
---

The `Comparable` mixin is deprecated.

Apps and addons should stop importing or extending `Comparable`. To provide custom comparison behavior, define a function-valued `compare(other)` method directly on the object or class instead.

Before:

```js
import EmberObject from '@ember/object';
import Comparable from '@ember/-internals/runtime/lib/mixins/comparable';

const Rectangle = EmberObject.extend(Comparable, {
  compare(other) {
    // custom comparison logic
  },
});
```

After:

```js
class Rectangle {
  // Returns -1, 0, 1
  compare(other) {
    // custom comparison logic
  },
}
```

Defining `compare(other)` directly is sufficient. 

However, if you need to `sort` a list of your objects, you will want to define a separate [`comparator function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description).
