---
title: 'A() from @ember/array'
until: 8.0.0
since: 7.5.0
---

The `A()` function from `@ember/array` is deprecated.

`A()` adds the [`EmberArray`](/id/deprecate-ember-array-mixin) and [`MutableArray`](/id/deprecate-mutable-array-mixin) methods to a plain JavaScript array. Native arrays have an equivalent for each of these methods. Use a native array. If changes to the array must update a template, use `trackedArray`.

### Before

```javascript
import { A } from '@ember/array';

let tags = A(['ember', 'glimmer']);

tags.pushObject('vite');
tags.get('firstObject'); // 'ember'
tags.get('lastObject'); // 'vite'
tags.removeObject('glimmer');
```

### After

```javascript
import { trackedArray } from '@ember/reactive/collections';

let tags = trackedArray(['ember', 'glimmer']);

tags.push('vite');
tags.at(0); // 'ember'
tags.at(-1); // 'vite'
tags.splice(tags.indexOf('glimmer'), 1);
```

If the array does not change after creation, an array literal is sufficient:

```javascript
let tags = ['ember', 'glimmer'];
```

If the array changes only when you assign a new array to a `@tracked` property, an array literal is also sufficient:

```javascript
import { tracked } from '@glimmer/tracking';

class Post {
  @tracked tags = ['ember', 'glimmer'];

  addTag(tag) {
    this.tags = this.tags.concat(tag);
  }
}
```

### Code that receives an array

Some code calls `A()` on an argument, because the argument can be a plain array. Remove the call and use the native methods:

```javascript
// Before
import { A } from '@ember/array';

function names(people) {
  return A(people).mapBy('name');
}
```

```javascript
// After
function names(people) {
  return people.map((person) => person.name);
}
```

Refer to the method lists in the [`EmberArray`](/id/deprecate-ember-array-mixin) and [`MutableArray`](/id/deprecate-mutable-array-mixin) guides for the native equivalent of each method.

For more background, read [RFC 1114](https://github.com/emberjs/rfcs/pull/1114).
