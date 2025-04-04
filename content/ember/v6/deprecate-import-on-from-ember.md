---
title: Ember.on
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `on` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.on
```

If needed, `on` can be imported:
```js
import { on } from '@ember/object/evented';
```
