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

You may ignore this deprecation via babel plugin (for both app and addon code), here: [babel-plugin-undeprecate-inject-from-at-ember-service](https://github.com/NullVoxPopuli/undeprecate-inject-from-at-ember-service).

For violations within your own code, this deprecation can be dealt with one a single pass via the [ember-codemod-remove-inject-as-service](https://github.com/ijlee2/ember-codemod-remove-inject-as-service) codemod.

If you're working on a library that needs to support ember-source prior to 4.1, you can support both styles of `service` via:
```js
import * as emberService from '@ember/service';

const service = emberService.service ?? emberService.inject;
```
