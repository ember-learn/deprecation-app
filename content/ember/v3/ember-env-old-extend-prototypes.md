---
id: ember-env.old-extend-prototypes
title: Old extend prototypes
until: '4.0.0'
since: '3.3'
---

Accessing `Ember.EXTEND_PROTOTYPES` is deprecated.

If you need to access the consuming application's `EXTEND_PROTOTYPES` configuration in your addon, you can do the following:

```js {data-filename=my-addon/addon/services/my-awesome-service.js}
import { getOwner } from "@ember/application";
import Service from "@ember/service";

export default class MyAwesomeService extends Service {
  myMethod() {
    const ENV = getOwner(this).resolveRegistration("config:environment");
    if (ENV.EmberENV.EXTEND_PROTOTYPES) {
      // ... do something
    }
  }
}
```

**As a reminder**, [disabling prototype extensions](https://guides.emberjs.com/release/configuring-ember/disabling-prototype-extensions/) in an Ember.js application is done by setting `EmberENV.EXTEND_PROTOTYPES` in `config/environment.js`.

```js {data-filename=config/environment.js}
ENV = {
  EmberENV: {
    EXTEND_PROTOTYPES: false
  }
}
```
