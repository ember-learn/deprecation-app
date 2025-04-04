---
title: Ember.isEqual
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `isEqual` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.isEqual
```

If needed, `isEqual` can be imported:
```js
import { isEqual } from '@ember/utils';
```
