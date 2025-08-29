---
title: Deprecate import empty from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`empty` from `@ember/object/computed` is deprecated. It returned true when the dependent value was `null`, `undefined`, an empty string, or had length 0.

## Migration
Implement the check in a getter.

Before:
```js
import { empty } from '@ember/object/computed';
class ListState {
  items = [];
  @empty('items') isEmpty;
}
```
After:
```js
import { isEmpty } from '@ember/utils';
class ListState {
  items = [];
  get isEmpty() { return isEmpty(this.items); }
}
```
Combine with `!` for `notEmpty` replacement.
