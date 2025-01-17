---
title: Importing `inject` from `@ember/service`
until: 7.0.0
since: 6.3.0
---

Importing `inject` from `@ember/service` is deprecated. Please import `service` instead.

Example:

```js {data-filename="my-route.js" data-diff="-2,+3"}
import { Route } from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { service } from '@ember/service';

export default class MyRoute extends Route {
  @service store;
}
```

You can use the [ember-codemod-remove-inject-as-service](https://github.com/ijlee2/ember-codemod-remove-inject-as-service) codemod, to fix all violations.