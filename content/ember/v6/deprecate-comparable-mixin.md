---
title: Deprecate Comparable mixin
id: deprecate-comparable-mixin
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
import EmberObject from '@ember/object';

const Rectangle = EmberObject.extend({
  compare(other) {
    // custom comparison logic
  },
});
```

Defining `compare(other)` directly is sufficient. Ember's `compare()` function uses duck-typing and will call a function-valued `compare` method when one is present, so the `Comparable` mixin is no longer required.
