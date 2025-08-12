---
title: Deprecate import lte from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`lte` (less than or equal) from `@ember/object/computed` is deprecated.

Before:
```js
import { lte } from '@ember/object/computed';
class Score {
  value = 5;
  @lte('value', 10) withinLimit;
}
```

After:
```js
class Score {
  value = 5;
  get withinLimit() {
    return this.value <= 10;
  }
}
```
