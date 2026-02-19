---
title: Ember.MutableEnumerable
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `MutableEnumerable` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.MutableEnumerable
```
`MutableEnumerable` is also private.

If needed, `MutableEnumerable` can be imported:
```js
import MutableEnumerable from '@ember/enumerable/mutable';
```

However, due to `MutableEnumerable` being private, it is not recommended, nor supported.
