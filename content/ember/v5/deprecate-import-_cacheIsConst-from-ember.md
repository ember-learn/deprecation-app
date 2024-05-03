---
title: Ember._cacheIsConst
until: 6.0.0
since: 5.10.0
---


Previously, _cacheIsConst could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._cacheIsConst
```

 If needed, _cacheIsConst can be imported:
```js
import { isConst } from '@glimmer/tracking/primitives/cache';
```
