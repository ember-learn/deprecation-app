---
title: Deprecate import gte from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`gte` (greater than or equal) from `@ember/object/computed` is deprecated.

Before:
```js
import { gte } from '@ember/object/computed';
class Score {
  value = 42;
  @gte('value', 10) meetsThreshold;
}
```

After:
```js
class Score {
  value = 42;
  get meetsThreshold() {
    return this.value >= 10;
  }
}
```
