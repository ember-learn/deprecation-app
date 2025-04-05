---
title: Ember.instrument
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `instrument` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.instrument
```
`instrument` is also private.

If needed, `instrument` can be imported:
```js
import { instrument } from '@ember/instrumentation';
```

However, due to `instrument` being private, it is not recommended, nor supported.
