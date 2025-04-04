---
title: Ember.sendEvent
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `sendEvent` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.sendEvent
```

If needed, `sendEvent` can be imported:
```js
import { sendEvent } from '@ember/object/events';
```
