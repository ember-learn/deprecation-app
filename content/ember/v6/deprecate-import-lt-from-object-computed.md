---
title: Deprecate import lt from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`lt` (less than) from `@ember/object/computed` is deprecated.

Before:
```js
import { lt } from '@ember/object/computed';
class Score {
  value = 5;
  @lt('value', 10) isLow;
}
```

After:
```js
class Score {
  value = 5;
  get isLow() {
    return this.value < 10;
  }
}
```
