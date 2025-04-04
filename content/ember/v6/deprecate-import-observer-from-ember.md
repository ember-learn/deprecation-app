---
title: Ember.observer
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `observer` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.observer
```

If needed, `observer` can be imported:
```js
import { observer } from '@ember/object';
```
