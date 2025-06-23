---
title: Ember.guidFor
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `guidFor` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.guidFor
```

If needed, `guidFor` can be imported:
```js
import { guidFor } from '@ember/object/internals';
```
