---
title: Ember.ViewUtils
until: 7.0.0
since: 6.5.0
---


Previously, `ViewUtils` could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.ViewUtils
```
`ViewUtils` is also private.

If needed, `ViewUtils` can be imported:
```js
import { isSerializationFirstNode } from '@ember/-internals/glimmer';
```

However, due to `ViewUtils` being private, it is not recommended, nor supported.
