---
title: Ember.setProperties
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `setProperties` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.setProperties
```

If needed, `setProperties` can be imported:
```js
import { setProperties } from '@ember/object';
```
