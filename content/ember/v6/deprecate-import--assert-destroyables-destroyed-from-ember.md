---
title: Ember._assertDestroyablesDestroyed
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `_assertDestroyablesDestroyed` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._assertDestroyablesDestroyed
```

If needed, `_assertDestroyablesDestroyed` can be imported:
```js
import { assertDestroyablesDestroyed } from '@ember/destroyable';
```
