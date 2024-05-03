---
title: Ember._registerDestructor
until: 6.0.0
since: 5.10.0
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
