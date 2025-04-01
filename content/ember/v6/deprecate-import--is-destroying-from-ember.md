---
title: Ember._isDestroying
until: 7.0.0
since: 6.5.0
---


Previously, `_isDestroying` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._isDestroying
```

If needed, `_isDestroying` can be imported:
```js
import { isDestroying } from '@ember/destroyable';
```
