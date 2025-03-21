---
title: Ember.mixin
until: 7.0.0
since: 6.5.0
---


Previously, `mixin` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.mixin
```
`mixin` is also private.

If needed, `mixin` can be imported:
```js
import { mixin } from '@ember/object/mixin';
```

However, due to `mixin` being private, it is not recommended, nor supported.
