---
title: Meta Destruction APIs
until: 3.25.0
since: 3.21.0
---


We are deprecated usage of `Ember.meta`  destruction apis.

* `setSourceDestroying()`
* `setSourceDestroyed()`
* `isSourceDestroying()`
* `isSourceDestroyed()`

Instead, you should use the similarly named APIs from `@ember/destroyable`.

RFC: https://emberjs.github.io/rfcs/0580-destroyables.html

```js
import { destroy, isDestroying, isDestroyed } from '@ember/destroyable' ;

let component = EmberObject.create();

isDestroying(component); // => false
isDestroyed(component); // => false

destroy(component);

isDestroying(component); // => true
isDestroyed(component); // => false

// some time later
isDestroyed(component); // => true
```
