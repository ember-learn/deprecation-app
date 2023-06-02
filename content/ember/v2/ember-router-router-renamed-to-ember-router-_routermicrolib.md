---
id: ember-router-router-renamed-to-ember-router-_routermicrolib
title: Ember.Router.router renamed to Ember.Router._routerMicrolib
until: '2.16.0'
since: '2.13'
---

The private `router` property of the `Ember.Router` instance (commonly found as `this.router` in `Ember.Route` instances or via router:main in the container)
has been renamed to `_routerMicrolib` to identify it as `router.js`, the microlib used within `Ember.Router`.

Addon and application developers that are using the internal `router` property of `Ember.Router` should replace those usages with `Ember.Router._routerMicrolib`.

This example demonstrates a common use case for `.router`.

Before:

```javascript
export default Ember.Service.extend({
  getRouteNameFromUrl (url) {
    const router = getContainer(this).lookup('router:main');
    const routes = router.router.recognizer.recognize(url);

    if (routes && routes.length) {
      return routes[routes.length-1].handler;
    }
  }
});
```

After:

```javascript
export default Ember.Service.extend({
  getRouteNameFromUrl (url) {
    const router = getContainer(this).lookup('router:main');
    const routes = router._routerMicrolib.recognizer.recognize(url);

    if (routes && routes.length) {
      return routes[routes.length-1].handler;
    }
  }
});
```
