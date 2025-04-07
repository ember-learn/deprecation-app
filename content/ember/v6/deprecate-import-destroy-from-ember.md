---
title: Ember.destroy
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `destroy` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.destroy
```

If needed, `destroy` can be imported:
```js
import { destroy } from '@ember/destroyable';
```
