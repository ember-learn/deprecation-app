---
title: Ember.onLoad
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `onLoad` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.onLoad
```

If needed, `onLoad` can be imported:
```js
import { onLoad } from '@ember/application';
```
