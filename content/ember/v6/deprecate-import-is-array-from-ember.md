---
title: Ember.isArray
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `isArray` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.isArray
```

If needed, `isArray` can be imported:
```js
import { isArray }  from '@ember/array';
```
