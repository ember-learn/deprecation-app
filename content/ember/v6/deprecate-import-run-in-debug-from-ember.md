---
title: Ember.runInDebug
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `runInDebug` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.runInDebug
```

If needed, `runInDebug` can be imported:
```js
import { runInDebug } from '@ember/debug';
```
