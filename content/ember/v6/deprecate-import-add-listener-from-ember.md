---
title: Ember.addListener
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `addListener` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.addListener
```

If needed, `addListener` can be imported:
```js
import { addListener } from '@ember/object/events';
```
