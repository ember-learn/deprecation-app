---
title: Implicit Route Model
until: 6.0.0
since: 5.3.0
---

Previously, if no `Route#model` hook was specified and a `_id` parameter was present, Ember would attempt to figure out how to load that model for you. Specify your own model hook to load from the store, if desired.

For example:

```js
import { Route } from '@ember/routing/route';
import { service } from '@ember/service';

export default class MyModelRoute extends Route {
  @service store;

  model({ my_model_id }) {
    return this.store.findRecord('my-model', my_model_id);
  }
}
```

For more background, read the [RFC](https://github.com/emberjs/rfcs/blob/master/text/0774-implicit-record-route-loading.md).
