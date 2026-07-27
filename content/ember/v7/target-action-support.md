---
title: Target Action Support
until: 8.0.0
since: 7.3.0
---

The `send` method (from the `ActionHandler` and `ActionSupport` mixins) and the `triggerAction` method (from the `TargetActionSupport` mixin) are deprecated.

These APIs are legacy patterns that predate native classes and Glimmer components. Their primary use case was to support the `{{action}}` helper and modifier, which [has already been deprecated](/deprecations/v5.x/#toc_template-action). The modern approach is to use standard class methods (optionally decorated with `@action` to bind `this`) and to pass functions directly, following the Data Down, Actions Up (DDAU) pattern.

### Scenario: `send` is used to call an action on the same object

Instead of dispatching a method by name with `this.send('someAction')`, define a regular method and call it directly.

#### For Classic Components with native classes

Before:
```javascript
import Component from '@ember/component';
import { action } from '@ember/object';

export default class Demo extends Component {
  doMath() {
    this.send('plusOne');
  }

  @action
  plusOne() {
    /* ... */
  }
}
```

After:
```javascript
import Component from '@ember/component';
import { action } from '@ember/object';

export default class Demo extends Component {
  doMath() {
    this.plusOne();
  }

  @action
  plusOne() {
    /* ... */
  }
}
```

#### For Classic Components with EmberObject.extend

Before:
```javascript
import Component from '@ember/component';

export default Component.extend({
  doMath() {
    this.send('plusOne');
  },

  actions: {
    plusOne() {
      /* ... */
    },
  },
});
```

After:
```javascript
import Component from '@ember/component';
import { action } from '@ember/object';

export default Component.extend({
  doMath() {
    this.plusOne();
  },

  plusOne: action(function () {
    /* ... */
  }),
});
```

### Scenario: `send` is used to bubble an action from a controller to a route

Previously, calling `send` on a controller would look for the action on the controller first, and then bubble up through the active routes until a matching action was found.

Instead of relying on bubbling, move the shared logic to where it is needed — for example into a service that both the controller and route can inject.

Before:
```javascript
// app/controllers/document.js
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class DocumentController extends Controller {
  @action
  save() {
    // bubbles up to the route's `save` action
    this.send('saveDocument');
  }
}
```

```javascript
// app/routes/document.js
import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class DocumentRoute extends Route {
  @action
  saveDocument() {
    /* ... saving logic */
  }
}
```

After:
```javascript
// app/services/documents.js
import Service from '@ember/service';

export default class DocumentsService extends Service {
  saveDocument() {
    /* ... saving logic */
  }
}
```

```javascript
// app/controllers/document.js
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class DocumentController extends Controller {
  @service documents;

  @action
  save() {
    this.documents.saveDocument();
  }
}
```

### Scenario: `triggerAction` is used to invoke an action on a target

`triggerAction` looked up a named action on the object (or on its `target`) and invoked it. Instead, call the method directly, or invoke a function that was passed in as an argument.

Before:
```javascript
import Component from '@ember/component';

export default Component.extend({
  actions: {
    save() {
      /* ... saving logic */
    },
  },

  doSave() {
    this.triggerAction({ action: 'save' });
  },
});
```

After:
```javascript
import Component from '@ember/component';
import { action } from '@ember/object';

export default Component.extend({
  save: action(function () {
    /* ... saving logic */
  }),

  doSave() {
    this.save();
  },
});
```

If the action lived on a `target`, invoke the function on that object directly, or — better — have the caller pass the function in as an argument (Data Down, Actions Up):

Before:
```javascript
this.triggerAction({ action: 'save', target: this.someTarget });
```

After:
```javascript
this.someTarget.save();
// or, if the function is passed in as an argument
this.args.save();
```

For more background, read the [RFC](https://github.com/emberjs/rfcs/pull/1041).
