---
title: Ember.ENV
until: 7.0.0
since: 6.5.0
parent: deprecate-import-ember-from-ember
---


Previously, `ENV` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.ENV
```

If needed, `ENV` can be imported:
```js
import MyEnv from '<my-app>/config/environment';
```


For addons, getting access to the environment requires having access to the `owner`:
```js
import { getOwner } from '@ember/owner';

// ...

let env = getOwner(this).resolveRegistration('config:environment');
```
