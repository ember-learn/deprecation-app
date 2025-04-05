---
title: Ember.assert
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `assert` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.assert
```

If needed, `assert` can be imported:
```js
import { assert } from '@ember/debug';
```
