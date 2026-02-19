---
title: Ember._action
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_action` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._action
```

If needed, `_action` can be imported:
```js
import { action } from '@ember/object';
```
