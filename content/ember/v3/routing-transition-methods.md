---
title: Transition methods of routes and controllers
until: 5.0.0
since: "3.26"
displayId: routing.transition-methods
---


The following methods are deprecated:
- `transitionTo` on `Route`
- `replaceWith` on `Route`
- `transitionToRoute` on `Controller`
- `replaceRoute` on `Controller`

Instead, the user should inject the router service in the respective class and use its methods.

### Route example

Before:

```javascript
// app/routes/settings.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SettingsRoute extends Route {
  @service session;

  beforeModel() {
    if (!this.session.isAuthenticated) {
      this.transitionTo('login');
    }
  }
}
```

After:

```javascript
// app/routes/settings.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SettingsRoute extends Route {
  @service router;
  @service session;

  beforeModel() {
    if (!this.session.isAuthenticated) {
      this.router.transitionTo('login');
    }
  }
}
```

### Controller example

Before:

```javascript
// app/controllers/new-post.js
import Controller from '@ember/controller';

export default class NewPostController extends Controller {
  @action
  async save({ title, text }) {
    let post = this.store.createRecord('post', { title, text });
    await post.save();
    return this.transitionToRoute('post', post.id);
  }
}
```

After:

```javascript
// app/controllers/new-post.js

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class NewPostController extends Controller {
  @service router;

  @action
  async save({ title, text }) {
    let post = this.store.createRecord('post', { title, text });
    await post.save();
    return this.router.transitionTo('post', post.id);
  }
}
```
