---
title: Ember._isDestroying
until: 6.0.0
since: 5.10.0
---


Previously, _isDestroying could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._isDestroying
```

 If needed, _isDestroying can be imported:
```js
import { isDestroying } from '@ember/destroyable';```
