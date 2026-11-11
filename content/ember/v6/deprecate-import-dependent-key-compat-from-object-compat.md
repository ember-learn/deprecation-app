---
title: Deprecate import dependentKeyCompat from @ember/object/compat
until: 7.0.0
since: 6.0.0
---

`dependentKeyCompat` is deprecated. It provided backwards compatibility so tracked getters could participate in classic CP dependency chains.

## Migration
Remove all ComputedProperties that depend on this getter, then remove `@dependentKeyCompat`.

Before:
```js
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { dependentKeyCompat } from '@ember/object/compat';
class Person {
  @tracked firstName = 'Tom';
  @tracked lastName = 'Dale';
  @dependentKeyCompat get givenName() { return this.firstName; }
  @computed('givenName','lastName') get fullName() { return `${this.givenName} ${this.lastName}`; }
}
```
After:
```js
import { tracked } from '@glimmer/tracking';
class Person {
  @tracked firstName = 'Tom';
  @tracked lastName = 'Dale';
  get givenName() { return this.firstName; }
  get fullName() { return `${this.givenName} ${this.lastName}`; }
}
```
