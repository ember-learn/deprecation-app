---
title: Deprecate import ComputedProperty from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`ComputedProperty` (the default export of `@ember/object/computed`) is deprecated. It was the internal class backing classic computed properties.

## Migration
Do not construct or refer to `ComputedProperty` directly. Use native getters with `@tracked` state instead.

Before:
```js
import ComputedProperty from '@ember/object/computed';
// rarely used directly
```
After: Remove the import; refactor any custom meta-programming to simple getters.

There is no public replacement for the class itself; the concept is removed.
