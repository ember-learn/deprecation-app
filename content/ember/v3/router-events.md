---
id: deprecate-router-events
title: Deprecate Router Events
until: '4.0.0'
since: '3.6'
---

Application-wide transition monitoring events belong on the Router service, not spread throughout the Route classes. That is the reason for the existing `willTransition` and `didTransition` hooks/events on the Router. But they are not sufficient to capture all the detail people need.

In addition, they receive handlerInfos in their arguments, which are an undocumented internal implementation detail of router.js that doesn't belong in Ember's public API. Everything you can do with handlerInfos can be done with the `RouteInfo`.


Below is how you would transition `Router` usages of `willTransition` and `didTransition`.

From:

```js
import Router from '@ember/routing/router';
import { inject as service } from '@ember/service';

export default Router.extend({
  currentUser: service('current-user'),

  willTransition(transition) {
    this._super(...arguments);
    if (!this.currentUser.isLoggedIn) {
      transition.abort();
      this.transitionTo('login');
    }
  },

  didTransition(privateInfos) {
    this._super(...arguments);
    ga.send('pageView', {
      pageName: privateInfos.name
    });
  }
});
```

To:

```js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service('current-user'),

  init() {
    this._super(...arguments);
    this.on('routeWillChange', transition => {
      if (!this.currentUser.isLoggedIn) {
        transition.abort();
        this.transitionTo('login');
      }
    });

    this.on('routeDidChange', transition => {
      ga.send('pageView', {
        pageName: transition.to.name
      });
    });
  }
});
```
