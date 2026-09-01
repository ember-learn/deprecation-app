---
title: Ember.getOwner
until: 7.0.0
since: 6.5.0
---


Previously, `getOwner` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.getOwner
```

If needed, `getOwner` can be imported:
```js
import { getOwner } from '@ember/owner';
```

If you're working in a library and need to support earlier than ember-source@4.11, you may use `@embroider/macros` to selectively import from the old location
```js
import {
  macroCondition,
  dependencySatisfies,
  importSync,
} from '@embroider/macros';

let getOwner;

if (macroCondition(dependencySatisfies('ember-source', '>= 4.11'))) {
  getOwner = importSync('@ember/owner').getOwner;
} else {
  getOwner = importSync('@ember/application').getOwner;
}
```
