---
title: Ember._isDestroyed
until: 6.0.0
since: 5.10.0
---


Previously, _isDestroyed could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._isDestroyed
```

 If needed, _isDestroyed can be imported:
```js
import { isDestroyed } from '@ember/destroyable';```
