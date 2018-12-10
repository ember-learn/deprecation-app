---
id: remove-handler-infos
title: HandlerInfos Removal
until: '3.9.0'
since: '3.6'
---

`HandlerInfo` was a private API that has been renamed to `RouteInfo` to align with the [router service RFC](https://github.com/emberjs/rfcs/blob/master/text/0095-router-service.md). If you need access to information about the routes, you are probably better served injecting the router service as it exposes a publically supported version of the `RouteInfo`s. You can access them in the following ways:

```javascript
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  router: service(),
  init() {
    this._super(...arguments);
    this.router.on('routeWillChange', transition => {
      let { to: toRouteInfo, from: fromRouteInfo } = transition;
      console.log(`Transitioning from -> ${fromRouteInfo.name}`);
      console.log(`to -> ${toRouteInfo.name}`);
    });

    this.router.on('routeDidChange', transition => {
      let { to: toRouteInfo, from: fromRouteInfo } = transition;
      console.log(`Transitioned from -> ${fromRouteInfo.name}`);
      console.log(`to -> ${toRouteInfo.name}`);
    });
  }

  actions: {
    sendAnalytics() {
      let routeInfo = this.router.currentRoute;
      ga.send('pageView', {
        pageName: routeInfo.name,
        metaData: {
          queryParams: routeInfo.queryParams,
          params: routeInfo.params,
        }
      });
    }
  }
});
```