---
title: Deprecate import not from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`not` from `@ember/object/computed` is deprecated.

Before:
```js
import { not } from '@ember/object/computed';
class State {
  isActive = true;
  @not('isActive') isInactive;
}
```

After:
```js
class State {
  isActive = true;
  get isInactive() { return !this.isActive; }
}
```
