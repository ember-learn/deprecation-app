---
title: Ember.Instrumentation
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `Instrumentation` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.Instrumentation
```
`Instrumentation` is also private.

If needed, `Instrumentation` can be imported:
```js
import { * } from '@ember/instrumentation';
```

However, due to `Instrumentation` being private, it is not recommended, nor supported.
