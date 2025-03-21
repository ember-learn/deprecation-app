---
title: Ember.subscribe
until: 7.0.0
since: 6.5.0
---


Previously, `subscribe` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.subscribe
```
`subscribe` is also private.

If needed, `subscribe` can be imported:
```js
import { subscribe } from '@ember/instrumentation';
```

However, due to `subscribe` being private, it is not recommended, nor supported.
