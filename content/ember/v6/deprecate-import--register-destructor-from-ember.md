---
title: Ember._registerDestructor
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_registerDestructor` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._registerDestructor
```

If needed, `_registerDestructor` can be imported:
```js
import { registerDestructor } from '@ember/destroyable';
```
