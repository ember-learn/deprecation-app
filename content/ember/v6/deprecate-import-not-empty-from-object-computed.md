---
title: Deprecate import notEmpty from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`notEmpty` from `@ember/object/computed` is deprecated.

Before:
```js
import { notEmpty } from '@ember/object/computed';
class ListState {
  items = [];
  @notEmpty('items') hasItems;
}
```

After:
```js
import { isEmpty } from '@ember/utils';
class ListState {
  items = [];
  get hasItems() {
    return !isEmpty(this.items);
  }
}
```
