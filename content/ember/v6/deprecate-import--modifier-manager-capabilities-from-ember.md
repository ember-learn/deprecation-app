---
title: Ember._modifierManagerCapabilities
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_modifierManagerCapabilities` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._modifierManagerCapabilities
```

If needed, `_modifierManagerCapabilities` can be imported:
```js
import { capabilities } from '@ember/modifier';
```
