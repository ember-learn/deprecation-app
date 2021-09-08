---
id: old-deprecate-method-paths
title: Old deprecate method path
until: '5.0.0'
since: '4.0.0'
---

Importing the method from `@ember/application/deprecations` has been deprecated :). Please import `deprecate` from `@ember/debug` module instead.

Before:
``` javascript
import { deprecate } from '@ember/application/deprecations';
```

After:
``` javascript
import { deprecate } from '@ember/debug';
```
