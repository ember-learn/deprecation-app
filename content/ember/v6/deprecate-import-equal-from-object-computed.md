---
title: Deprecate import equal from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`equal` from `@ember/object/computed` is deprecated. It compared a dependent key's value to a constant.

## Migration
Use a getter with a strict equality expression.

Before:
```js
import { equal } from '@ember/object/computed';
class Person {
  role = 'admin';
  @equal('role', 'admin') isAdmin;
}
```

After:
```js
class Person {
  role = 'admin';
  get isAdmin() {
    return this.role === 'admin';
  }
}
```
