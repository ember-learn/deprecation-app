---
title: Ember.Enumerable
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `Enumerable` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.Enumerable
```
`Enumerable` is also private.

If needed, `Enumerable` can be imported:
```js
import Enumerable from '@ember/enumerable';
```

However, due to `Enumerable` being private, it is not recommended, nor supported.
