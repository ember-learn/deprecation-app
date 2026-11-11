---
title: Deprecate import oneWay / reads from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`oneWay` (often aliased locally as `reads`) from `@ember/object/computed` is deprecated. It made a property that reflects another property's value but did not propagate sets back.

## Migration
Use the original property or a getter.

Before:
```js
import { oneWay } from '@ember/object/computed';
class Person {
  firstName = 'Tom';
  @oneWay('firstName') name;
}

```
After:
```js
class Person {
  firstName = 'Tom';
  get name() { return this.firstName; }
}
```
