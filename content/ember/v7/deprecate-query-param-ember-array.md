---
title: 'Ember array methods on query param arrays'
until: 8.0.0
since: 7.5.0
---

The array value of a query param becomes a native array.

When a query param has an array as its default value, the controller gets an Ember array. This is an array with the [`EmberArray`](/id/deprecate-ember-array-mixin) and [`MutableArray`](/id/deprecate-mutable-array-mixin) methods, the same as the result of [`A()`](/id/deprecate-ember-array-a). The use of one of these methods or properties on that array is deprecated, for example `pushObject`, `removeObject` or `firstObject`.

To change an array query param, assign a new array to the property. Use native array methods to read the array.

### Before

```javascript
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ArticlesController extends Controller {
  queryParams = ['tags'];

  tags = [];

  get firstTag() {
    return this.tags.firstObject;
  }

  @action
  addTag(tag) {
    this.tags.pushObject(tag);
  }

  @action
  removeTag(tag) {
    this.tags.removeObject(tag);
  }
}
```

### After

```javascript
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ArticlesController extends Controller {
  queryParams = ['tags'];

  @tracked tags = [];

  get firstTag() {
    return this.tags.at(0);
  }

  @action
  addTag(tag) {
    this.tags = this.tags.concat(tag);
  }

  @action
  removeTag(tag) {
    this.tags = this.tags.filter((item) => item !== tag);
  }
}
```

A change to the array in place with a native method, for example `this.tags.push(tag)`, does not update the URL. Assign a new array.

Refer to the method lists in the [`EmberArray`](/id/deprecate-ember-array-mixin) and [`MutableArray`](/id/deprecate-mutable-array-mixin) guides for the native equivalent of each method.

For more background, read [RFC 1114](https://github.com/emberjs/rfcs/pull/1114).
