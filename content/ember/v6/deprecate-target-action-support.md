---
title: Deprecate Target Action Support
until: 7.0.0
since: 6.8.0
---

The `actions` hash on components, controllers, and routes, along with the `send` method, is deprecated. These APIs were primarily used with the now-deprecated `{{action}}` modifier and helper.

The modern approach is to use standard class methods decorated with the `@action` decorator, and to pass functions directly.

### `actions` hash and `send`

**Old Pattern**

Previously, you would define actions in an `actions` hash and use `this.send('actionName')` to call them.

```javascript
// app/components/my-component.js
import Component from '@ember/component';

export default Component.extend({
  actions: {
    save() {
      // ... saving logic
    },
    cancel() {
      // ... cancel logic
    }
  },

  someMethod() {
    this.send('save');
  }
});
```

**New Pattern**

With modern classes, you can define methods directly on the class and decorate them with `@action`. You can then call them like any other method.

```javascript
// app/components/my-component.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MyComponent extends Component {
  @action
  save() {
    // ... saving logic
  }

  @action
  cancel() {
    // ... cancel logic
  }

  someMethod() {
    this.save();
  }
}
```
