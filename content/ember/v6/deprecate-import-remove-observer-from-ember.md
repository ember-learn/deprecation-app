---
title: Ember.removeObserver
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `removeObserver` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.removeObserver
```

If needed, `removeObserver` can be imported:
```js
import { removeObserver } from '@ember/object/observers';
```
