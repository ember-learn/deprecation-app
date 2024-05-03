---
title: Ember.makeArray
until: 6.0.0
since: 5.10.0
---


Previously, makeArray could be accessed via the `Ember` import:
```js
import Ember from 'ember';

Ember.makeArray

```
makeArray is also private.

 If needed, makeArray can be imported:
```js
import { makeArray }  from '@ember/array';```

However, due to makeArray being private, it is not recommended, nor supported.
