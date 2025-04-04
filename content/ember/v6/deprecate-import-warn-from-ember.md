---
title: Ember.warn
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `warn` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.warn
```

If needed, `warn` can be imported:
```js
import { warn } from '@ember/debug';
```
