---
title: Ember._concat
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_concat` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._concat
```

If needed, `_concat` can be imported:
```js
import { concat } from '@ember/helper';
```
