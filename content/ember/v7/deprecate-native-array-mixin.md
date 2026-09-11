---
title: 'NativeArray mixin'
until: 8.0.0
since: 7.4.0
---

The `NativeArray` mixin from `@ember/array` is deprecated.

`NativeArray` is the set of [`EmberArray`](/id/deprecate-ember-array-mixin) and [`MutableArray`](/id/deprecate-mutable-array-mixin) methods that `A()` adds onto a plain JavaScript array. Using the mixin yourself now triggers this deprecation. Native arrays already have everything you need. Use them as-is, or wrap them with `trackedArray` when changes need to re-render.

### Before

```javascript
import { A, NativeArray } from '@ember/array';

let tags = A(['ember', 'glimmer']);

tags.pushObject('vite');
tags.get('lastObject'); // 'vite'

NativeArray.detect(tags); // true
```

### After

```javascript
import { trackedArray } from '@ember/reactive/collections';

let tags = trackedArray(['ember', 'glimmer']);

tags.push('vite');
tags.at(-1); // 'vite'

Array.isArray(tags); // true
```

If the array never changes after creation, or only changes by reassignment of a `@tracked` property, a plain array literal is enough and `trackedArray` is not needed.

Refer to the method tables in the [`EmberArray`](/id/deprecate-ember-array-mixin) and [`MutableArray`](/id/deprecate-mutable-array-mixin) guides for a native equivalent of each method.

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
