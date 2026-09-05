---
title: Deprecate import alias from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`alias` from `@ember/object/computed` is deprecated.

It created a second property that reflected another property's value.

## Migration
Prefer direct access to the original tracked state, or use a simple getter and setter.

Before:
```js
import { alias } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

class Person {
  @tracked firstName = 'Tom';
  @alias('firstName') name;
}
```

After:
```js
import { tracked } from '@glimmer/tracking';
class Person {
  @tracked firstName = 'Tom';
  get name() { return this.firstName; }
  set name(value) { this.firstName = value; }
}
```
If all call sites can use `firstName` directly, remove the alias entirely.
