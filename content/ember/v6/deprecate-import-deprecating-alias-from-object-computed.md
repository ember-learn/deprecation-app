---
title: Deprecate import deprecatingAlias from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`deprecatingAlias` from `@ember/object/computed` is deprecated. It created an alias that emitted a deprecation when accessed.

## Migration
Remove the indirection and update callers to reference the canonical property. If you still need a deprecation message temporarily, implement a manual getter that logs once.

Before (framework provided deprecation):
```js
import { deprecatingAlias } from '@ember/object/computed';
class Person {
  firstName = 'Tom';
  @deprecatingAlias('firstName', { id: 'app.old-name', until: '7.0.0' }) givenName;
}
```
After (direct access):
```js
class Person {
  firstName = 'Tom';
}
```
Optional transitional getter:
```js
import { deprecate } from '@ember/debug';
class Person {
  firstName = 'Tom';
  get givenName() {
    deprecate('Usage of `givenName` is deprecated, use `firstNAme` instead.');
    return this.firstName;
  }
}
```
