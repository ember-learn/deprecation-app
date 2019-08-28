---
id: application-controller.router-properties
title: Application controller router properties
until: '4.0.0'
since: '3.9'
---

If you are reliant on the `currentPath` and `currentRouteName` properties of the `ApplicationController`, you can get the same functionality from the `Router` service.

To migrate, inject the `Router` service and read the `currentRouteName` off of it.

Before:

```javascript {data-filename=app/controllers/application.js}
import Controller from '@ember/controller';
import fetch from 'fetch';

export default Controller.extend({
  store: service('store'),

  actions: {
    sendPayload() {
      fetch('/endpoint', {
        method: 'POST',
        body: JSON.stringify({
          route: this.currentRouteName
        })
      });
    }
  }
})
```

After:

```javascript {data-filename=app/controllers/application.js}
import Controller from '@ember/controller';
import fetch from 'fetch';

export default Controller.extend({
  store: service('store'),
  router: service('router'),

  actions: {
    sendPayload() {
      fetch('/endpoint', {
        method: 'POST',
        body: JSON.stringify({
          route: this.router.currentRouteName
        })
      });
    }
  }
})
```
