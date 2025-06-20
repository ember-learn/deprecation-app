---
title: Deprecating Ember.Mixin
until: 7.0.0
since: 6.5.0
---

`Ember.Mixin` is deprecated. This is part of the legacy `@ember/object` API and is not fully compatible with native classes. Instead of using mixins, you should refactor your code to use class-based patterns.

One common pattern to replace mixins is to use class decorators.

### Before: Using Mixins

Here is an example of a mixin that provides "editable" functionality to a class:

```javascript
// app/mixins/editable.js
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  isEditing: false,

  edit() {
    console.log('starting to edit');
    this.set('isEditing', true);
  },
});
```

```javascript
// app/models/comment.js
import EmberObject from '@ember/object';
import EditableMixin from '../mixins/editable';

export default class Comment extends EmberObject.extend(EditableMixin) {
  post = null;
}
```

### After: Using Class Decorators

You can achieve the same result by creating a class decorator. This decorator will add the same properties and methods to the class it's applied to.

First, create the decorator function:

```javascript
// app/decorators/editable.js
import { tracked } from '@glimmer/tracking';

export function editable(klass) {
  return class extends klass {
    @tracked isEditing = false;

    edit() {
      console.log('starting to edit');
      this.isEditing = true;
    }
  };
}
```

Then, apply the decorator to your class:

```javascript
// app/models/comment.js
import EmberObject from '@ember/object';
import { editable } from '../decorators/editable';

@editable
export default class Comment extends EmberObject {
  post = null;
}
```

This approach provides the same functionality as the mixin but uses standard JavaScript features, making the code easier to understand and maintain.
