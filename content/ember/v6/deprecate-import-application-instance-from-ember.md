---
title: Ember.ApplicationInstance
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `ApplicationInstance` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.ApplicationInstance
```

If needed, `ApplicationInstance` can be imported:
```js
import ApplicationInstance from '@ember/application/instance';
```
