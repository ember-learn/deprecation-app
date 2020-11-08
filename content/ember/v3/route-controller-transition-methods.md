---
id: routing.transition-methods
title: Deprecate transition methods of routes and controllers
until: '4.0.0'
since: 'Upcoming Features'
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
  // app/route/foo.js
  import Route from '@ember/routing/route';
  import { inject as service } from '@ember/service';

  export default class FooRoute extends Route {
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
  // app/route/foo.js
  import Route from '@ember/routing/route';
  import { inject as service } from '@ember/service';

  export default class FooRoute extends Route {
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
  // app/controllers/foo.js
  import Controller from '@ember/controller';

  export default class FooController extends Controller {
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
  // app/controllers/foo.js

  import Controller from '@ember/controller';
  import { inject as service } from '@ember/service';

  export default class FooController extends Controller {
    @service router;

    @action
    async save({ title, text }) {
      let post = this.store.createRecord('post', { title, text });
      await post.save();
      return this.router.transitionTo('post', post.id);
    }
  }
```