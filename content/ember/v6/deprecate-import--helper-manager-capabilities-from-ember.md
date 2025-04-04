---
title: Ember._helperManagerCapabilities
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_helperManagerCapabilities` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._helperManagerCapabilities
```

If needed, `_helperManagerCapabilities` can be imported:
```js
import { capabilities } from '@ember/helper';
```
