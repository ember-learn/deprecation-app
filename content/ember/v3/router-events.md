---
id: deprecate-router-events
title: Deprecate Router Events
until: '4.0.0'
since: '3.6'
---

Application-wide transition monitoring events belong on the Router service, not spread throughout the Route classes. That is the reason for the existing `willTransition` and `didTransition` hooks/events on the Router. But they are not sufficient to capture all the detail people need.

In addition, they receive handlerInfos in their arguments, which are an undocumented internal implementation detail of router.js that doesn't belong in Ember's public API. Everything you can do with handlerInfos can be done with the `RouteInfo`.

Below is how you would transition both the `Route` and `Router` usages of `willTransition` and `didTransition`.

### Route

From:

```javascript
import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    willTransition(transition) {
      if (this.controller.get('userHasEnteredData') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        return true;
      }
    },

    didTransition() {
      this.controller.get('errors.base').clear();
      return true; // Bubble the didTransition event
    }
  }
});
```

To:

```js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  router: service(),
  init() {
    this._super(...arguments);
    this.router.on('routeWillChange', transition => {
      if (this.controller.get('userHasEnteredData') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      }

      // No need to return, no longer in a bubbling API
    });

    this.router.on('routeDidChange', transition => {
      this.controller.get('errors.base').clear();
      // No need to return, no longer in a bubbling API
    });
  }
```

### Router

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
import Router from '@ember/routing/router';
import { inject as service } from '@ember/service';

export default Router.extend({
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