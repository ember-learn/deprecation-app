---
title: 'ActionHandler mixin'
until: 7.9.0
since: 7.4.0
---

The `ActionHandler` mixin from `@ember/-internals/runtime` is deprecated. This mixin was private but since it may have been used we have added a deprecation as a courtesy through the next LTS.

`ActionHandler` gave an object an `actions` hash and a `send` method. Both are already deprecated on their own (refer to the [`send` deprecation](/id/deprecate-target-action-support)). The replacement is a plain method, decorated with `@action` when it is passed around as a callback, for example to a modifier.

### Before

```javascript
import EmberObject from '@ember/object';
import { ActionHandler } from '@ember/-internals/runtime';

export default class Uploader extends EmberObject.extend(ActionHandler) {
  actions = {
    start(file) {
      /* ... */
    },
  };

  upload(file) {
    this.send('start', file);
  }
}
```

### After

```javascript
import { action } from '@ember/object';

export default class Uploader {
  @action
  start(file) {
    /* ... */
  }

  upload(file) {
    this.start(file);
  }
}
```

`@action` is only needed when the method is handed to something else (an `{{on}}` modifier, a child component argument, an event listener) and must keep its `this`. A method that is only called as `this.start()` does not need it.

If the mixin was used for bubbling through `target`, pass the function down as an argument instead of naming it and bubbling by string.

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
