---
id: transition-state
title: Transition State Removal
until: '3.9.0'
since: '3.6'
---

The `Transition` object is a public interface that actually exposed internal state used by router.js to perform routing. Accessing `state`, `queryParams` or `params` on the `Transition` has been removed. If you need access to information about the routes, you are probably better served injecting the router service as it exposes a publically supported version of the `RouteInfo`s. You can access them in the following ways:

```javascript
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  router: service(),
  init() {
    this._super(...arguments);
    this.router.on('routeWillChange', transition => {
      let { to: toRouteInfo, from: fromRouteInfo } = transition;
      if (fromRouteInfo) {
        console.log(`Transitioning from -> ${fromRouteInfo.name}`);
        console.log(`From QPs: ${JSON.stringify(fromRouteInfo.queryParams)}`);
        console.log(`From Params: ${JSON.stringify(fromRouteInfo.params)}`);
        console.log(`From ParamNames: ${fromRouteInfo.paramNames.join(', ')}`);
      }
      
      if (toRouteInfo) {
        console.log(`to -> ${toRouteInfo.name}`);
        console.log(`To QPs: ${JSON.stringify(toRouteInfo.queryParams)}`);
        console.log(`To Params: ${JSON.stringify(toRouteInfo.params)}`);
        console.log(`To ParamNames: ${toRouteInfo.paramNames.join(', ')}`);
      }
    });

    this.router.on('routeDidChange', transition => {
      let { to: toRouteInfo, from: fromRouteInfo } = transition;
      if (fromRouteInfo) {
        console.log(`Transitioned from -> ${fromRouteInfo.name}`);
        console.log(`From QPs: ${JSON.stringify(fromRouteInfo.queryParams)}`);
        console.log(`From Params: ${JSON.stringify(fromRouteInfo.params)}`);
        console.log(`From ParamNames: ${fromRouteInfo.paramNames.join(', ')}`);
      }
      
      if (toRouteInfo) {
        console.log(`to -> ${toRouteInfo.name}`);
        console.log(`To QPs: ${JSON.stringify(toRouteInfo.queryParams)}`);
        console.log(`To Params: ${JSON.stringify(toRouteInfo.params)}`);
        console.log(`To ParamNames: ${toRouteInfo.paramNames.join(', ')}`);
      }
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
