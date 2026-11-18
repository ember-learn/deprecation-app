---
title: Deprecate import bool from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`bool` from `@ember/object/computed` is deprecated. It coerced the value of another property to a boolean.

## Migration
Use a getter wrapping `Boolean(...)` or `!!`.

Before:
```js
import { bool } from '@ember/object/computed';
class State {
  selectedItem = null;
  @bool('selectedItem') hasSelection;
}
```

After:
```js
class State {
  selectedItem = null;
  get hasSelection() { return Boolean(this.selectedItem); }
}
```
