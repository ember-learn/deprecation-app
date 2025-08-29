---
title: Deprecate import and from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`and` from `@ember/object/computed` is deprecated. It previously produced the logical AND of dependent keys.

## Migration
Use a getter with a standard JavaScript boolean expression.

Before:
```js
import { and } from '@ember/object/computed';
class Cart {
  items = [];
  user = null;
  @and('items.length', 'user.isLoggedIn') canCheckout;
}
```
After:
```js
class Cart {
  items = [];
  user = null;
  get canCheckout() {
    return this.items.length > 0 && this.user?.isLoggedIn;
  }
}
```
