---
title: Ember._captureRenderTree
until: 6.0.0
since: 5.10.0
---


Previously, _captureRenderTree could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember._captureRenderTree

```
_captureRenderTree is also private.

 If needed, _captureRenderTree can be imported:
```js
import { captureRenderTree } from '@ember/debug';```

However, due to _captureRenderTree being private, it is not recommended, nor supported.
