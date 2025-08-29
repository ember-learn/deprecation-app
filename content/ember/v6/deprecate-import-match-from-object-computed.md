---
title: Deprecate import match from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`match` from `@ember/object/computed` is deprecated. It tested a property's string value against a regular expression.

## Migration
Use a getter with `RegExp.test`.

Before:
```js
import { match } from '@ember/object/computed';
class User {
  email = 'me@example.com';
  @match('email', /@example\.com$/) isInternal;
}
```

After:
```js
class User {
  email = 'me@example.com';
  get isInternal() {
    return /@example\.com$/.test(this.email);
  }
}
```
