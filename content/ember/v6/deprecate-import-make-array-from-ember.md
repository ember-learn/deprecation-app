---
title: Ember.makeArray
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `makeArray` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.makeArray
```
`makeArray` is also private.

If needed, `makeArray` can be imported:
```js
import { makeArray }  from '@ember/array';
```

However, due to `makeArray` being private, it is not recommended, nor supported.
