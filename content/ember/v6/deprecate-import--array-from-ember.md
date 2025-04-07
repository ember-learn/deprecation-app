---
title: Ember._array
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_array` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._array
```

If needed, `_array` can be imported:
```js
import { array } from '@ember/helper';
```
