---
title: Deprecate import expandProperties from @ember/object/computed
until: 7.0.0
since: 6.0.0
---

`expandProperties` is deprecated. It expanded bracket / brace notation in classic CP dependent key strings.

## Migration
This is largely unneeded and there is no direct replacement.

Before:
```js
import { expandProperties } from '@ember/object/computed';
expandProperties('user.{first,last}Name', (prop) => {/* ... */});
```

After: List properties explicitly: `user.firstName`, `user.lastName`.
