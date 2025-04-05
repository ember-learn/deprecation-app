---
title: Ember.VERSION
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `VERSION` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.VERSION
```

If needed, `VERSION` can be imported:
```js
import { VERSION } from '@ember/version';
```
