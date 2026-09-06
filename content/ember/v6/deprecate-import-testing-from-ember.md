---
title: Ember.testing
until: 7.0.0
since: 6.5.0
---


Previously, `testing` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.testing
```

You can replace this with an import from the [`@embroider/macros`](https://github.com/embroider-build/embroider/tree/main/packages/macros) package:

```js
import { isTesting } from '@embroider/macros';

isTesting()
```
