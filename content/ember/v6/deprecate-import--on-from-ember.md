---
title: Ember._on
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_on` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._on
```

If needed, `_on` can be imported:
```js
import { on } from '@ember/modifier';
```
