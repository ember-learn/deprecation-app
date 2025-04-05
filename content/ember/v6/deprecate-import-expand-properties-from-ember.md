---
title: Ember.expandProperties
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `expandProperties` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.expandProperties
```

If needed, `expandProperties` can be imported:
```js
import { expandProperties } from '@ember/object/computed';
```
