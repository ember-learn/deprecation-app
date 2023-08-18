---
title: Importing `inject` from `@ember/service`
until: 7.0.0
since: 6.3.0
displayId: importing-inject-from-ember-service
---

Importing `inject` from `@ember/service` is deprecated. Please import `service` instead.

Example:

```diff
import { Route } from '@ember/routing/route';
- import { inject as service } from '@ember/service';
+ import { service } from '@ember/service';

export default class MyRoute extends Route {
  @service store;
}
```
