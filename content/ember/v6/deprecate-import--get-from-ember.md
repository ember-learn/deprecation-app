---
title: Ember._get
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_get` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._get
```

If needed, `_get` can be imported:
```js
import { get } from '@ember/helper';
```
