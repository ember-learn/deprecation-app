---
id: implicit-injections
title: "Implicit Injections"
until: '5.0.0'
since: '4.0.0'
---

Implicit injections have been [deprecated](https://deprecations.emberjs.com/v3.x#toc_implicit-injections) since Ember v3.26.0.  As of v4.0.0, implicit injections do nothing and should be removed based on suggestions in the original deprecation.

Before:

```js
export default {
  initialize(app) {
    app.inject('route', 'store', 'service:store');
  }
}
```

```js
import { Route } from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  model() {
    return this.store.findQuery('user', 123);
  }
}
```

After:

```js
import { Route } from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;

  model() {
    return this.store.findQuery('user', 123);
  }
}
```

For a more detailed explanation with additional examples, see the old deprecation [guides](https://deprecations.emberjs.com/v3.x#toc_implicit-injections).