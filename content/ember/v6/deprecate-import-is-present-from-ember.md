---
title: Ember.isPresent
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `isPresent` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.isPresent
```

If needed, `isPresent` can be imported:
```js
import { isPresent } from '@ember/utils';
```
