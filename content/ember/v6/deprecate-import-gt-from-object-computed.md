---
title: Deprecate import gt from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`gt` (greater than) from `@ember/object/computed` is deprecated.

## Migration
Use a comparison inside a getter.

Before:
```js
import { gt } from '@ember/object/computed';
class Score {
  value = 42;
  @gt('value', 10) isHigh;
}
```

After:
```js
class Score {
  value = 42;
  get isHigh() {
    return this.value > 10;
  }
}
```
