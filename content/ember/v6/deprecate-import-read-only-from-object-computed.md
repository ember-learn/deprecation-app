---
title: Deprecate import readOnly from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`readOnly` from `@ember/object/computed` is deprecated.

## Migration
Use a getter that returns the underlying value.

Before:
```js
import { readOnly } from '@ember/object/computed';
class Person {
  firstName = 'Tom';
  @readOnly('firstName') givenName;
}
```

After:
```js
class Person {
  firstName = 'Tom';
  get givenName() { return this.firstName; }
}
```

Don't define a setter to keep it effectively read-only.
