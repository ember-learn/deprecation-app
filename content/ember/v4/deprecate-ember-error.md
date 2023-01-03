---
id: deprecate-ember-error
title: '@ember/error Package'
until: '5.0.0'
since: '4.10.0'
---

Use of `@ember/error` is deprecated. This package merely re-exports the native Error class. You should replace any uses of `@ember/error` with the native `Error`.

Before:
``` javascript
import EmberError from '@ember/error';

throw new EmberError("My Error");
```

After:
``` javascript
throw new Error("My Error");
```
