---
title: Deprecate import or from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`or` from `@ember/object/computed` is deprecated.

Before:
```js
import { or } from '@ember/object/computed';
class Session {
  token = null;
  cachedToken = 'abc';
  @or('token','cachedToken') activeToken;
}
```

After:
```js
class Session {
  token = null;
  cachedToken = 'abc';
  get activeToken() { return this.token || this.cachedToken; }
}
```
