---
title: Ember.setOwner
until: 6.0.0
since: 5.10.0
---


Previously, `setOwner` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.setOwner
```

If needed, `setOwner` can be imported:
```js
import { setOwner } from '@ember/owner';
```

If you're working in a library and need to support earlier than ember-source@4.11, you may use `@embroider/macros` to selectively import from the old location
```js
import {
  macroCondition,
  dependencySatisfies,
  importSync,
} from '@embroider/macros';

let setOwner;

if (macroCondition(dependencySatisfies('ember-source', '>= 4.11'))) {
  setOwner = importSync('@ember/owner').setOwner;
} else {
  setOwner = importSync('@ember/application').setOwner;
}
```
