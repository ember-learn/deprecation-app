---
title: Ember.debug
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `debug` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.debug
```

If needed, `debug` can be imported:
```js
import { debug } from '@ember/debug';
```
