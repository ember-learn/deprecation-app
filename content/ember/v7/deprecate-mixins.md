---
title: Deprecation of @ember/object/mixin
until: 8.0.0
since: 7.4.0
---

`Mixin` from `@ember/object/mixin` is deprecated. Mixins are part of the legacy `EmberObject` class system and do not work with native class syntax.

If your code still uses classic class syntax, convert it to native classes first, for example with the [ember-native-class-codemod](https://github.com/ember-codemods/ember-native-class-codemod). Then remove the mixins using one of the patterns below.

### Before: sharing behavior with a mixin

```javascript
// app/mixins/editable.js
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  isEditing: false,

  edit() {
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

### After: sharing behavior with a subclass factory

A function that takes a base class and returns a subclass provides the same composition using only standard JavaScript:

```javascript
// app/utils/editable.js
import { tracked } from '@glimmer/tracking';

export function editable(Base) {
  return class extends Base {
    @tracked isEditing = false;

    edit() {
      this.isEditing = true;
    }
  };
}
```

```javascript
// app/models/comment.js
import EmberObject from '@ember/object';
import { editable } from '../utils/editable';

export default class Comment extends editable(EmberObject) {
  post = null;
}
```

Because the factory returns a class expression, it also works as a class decorator (`@editable`) if your build is configured for decorator syntax on classes.

### Other replacements

Depending on what a mixin was doing, a different pattern may fit better:

- Shared state or behavior used across the app belongs in a service or service-like abstraction, injected where needed.
- Stateless helpers can be plain functions exported from a module (these are also easier to unit test).
- Behavior only used by one class hierarchy can move into a common base class (though composition is **strongly** recommended instead of inheritance).

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
