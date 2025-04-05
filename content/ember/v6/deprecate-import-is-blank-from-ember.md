---
title: Ember.isBlank
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `isBlank` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.isBlank
```

If needed, `isBlank` can be imported:
```js
import { isBlank } from '@ember/utils';
```
