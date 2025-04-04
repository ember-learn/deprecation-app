---
title: Ember._tracked
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_tracked` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._tracked
```

If needed, `_tracked` can be imported:
```js
import { tracked } from '@glimmer/tracking';
```
