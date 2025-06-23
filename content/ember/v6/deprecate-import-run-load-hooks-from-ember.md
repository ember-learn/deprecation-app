---
title: Ember.runLoadHooks
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `runLoadHooks` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.runLoadHooks
```

If needed, `runLoadHooks` can be imported:
```js
import { runLoadHooks } from '@ember/application';
```
