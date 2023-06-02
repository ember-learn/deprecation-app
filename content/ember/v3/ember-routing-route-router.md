---
id: ember-routing.route-router
title: Private property `Route.router` has been renamed to `Route._router`
until: '3.5.0'
since: '3.2'
---

The `Route#router` private API has been renamed to `Route#_router` to avoid collisions with user-defined
properties or methods.
If you want access to the router, you are probably better served injecting the router service into
the route like this:

```javascript
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  router: service()
});
```
