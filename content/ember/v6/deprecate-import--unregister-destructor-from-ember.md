---
title: Ember._unregisterDestructor
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_unregisterDestructor` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._unregisterDestructor
```

If needed, `_unregisterDestructor` can be imported:
```js
import { unregisterDestructor } from '@ember/destroyable';
```
