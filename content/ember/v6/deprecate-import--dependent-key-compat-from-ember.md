---
title: Ember._dependentKeyCompat
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_dependentKeyCompat` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._dependentKeyCompat
```

If needed, `_dependentKeyCompat` can be imported:
```js
import { dependentKeyCompat } from '@ember/object/compat';
```
