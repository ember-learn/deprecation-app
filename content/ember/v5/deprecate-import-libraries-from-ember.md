---
title: Ember.libraries
until: 6.0.0
since: 5.10.0
---


Previously, `libraries` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.libraries
```

There is no replacement for this API.

If needed, `libraries` can be imported from a private module:
```js
import { libraries } from '@ember/-internals/metal';

```

Instead of using this import, consider using a build plugin for your packager. 
Some options:
- https://github.com/ubilabs/webpack-node-modules-list
- https://github.com/yjl9903/unplugin-info

These are both more automatic than Ember's `libraries` utility.
