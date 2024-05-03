---
title: Ember.Instrumentation
until: 6.0.0
since: 5.10.0
---


Previously, Instrumentation could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.Instrumentation
```
Instrumentation is also private.

 If needed, Instrumentation can be imported:```js
import { * } from '@ember/instrumentation';```

However, due to Instrumentation being private, it is not recommended, nor supported.
