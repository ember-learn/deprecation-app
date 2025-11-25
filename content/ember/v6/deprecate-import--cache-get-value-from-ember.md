---
title: Ember._cacheGetValue
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_cacheGetValue` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._cacheGetValue
```

If needed, `_cacheGetValue` can be imported:
```js
import { getValue } from '@glimmer/tracking/primitives/cache';
```
