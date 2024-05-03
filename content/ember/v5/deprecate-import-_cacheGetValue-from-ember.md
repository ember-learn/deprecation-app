---
title: Ember._cacheGetValue
until: 6.0.0
since: 5.10.0
---


Previously, _cacheGetValue could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._cacheGetValue
```

 If needed, _cacheGetValue can be imported:```js
import { getValue } from '@glimmer/tracking/primitives/cache';```
