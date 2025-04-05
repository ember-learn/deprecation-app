---
title: Ember._setComponentManager
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_setComponentManager` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._setComponentManager
```

If needed, `_setComponentManager` can be imported:
```js
import { setComponentManager } from '@ember/component';
```
