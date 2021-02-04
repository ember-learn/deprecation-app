---
id: implicit-injections
title: "Implicit Injections"
until: '4.0.0'
since: 'Upcoming Features'
---

Implicit injections are injections that are made by telling Ember to inject a
service (or another type of value) into every instance of a specific type of
object. A common example of this was the `store` property that was injected into
routes and controllers when users installed Ember Data by default.

```js
export default class ApplicationRoute extends Route {
  model() {
    return this.store.findQuery('user', 123);
  }
}
```

Notice how the user can access `this.store` without having declared the store
service using the `@service` decorator. This was accomplished by using the
`owner.inject` API, usually in an initializer:

```js
export default {
  initialize(app) {
    app.inject('route', 'store', 'service:store');
    app.inject('controller', 'store', 'service:store');
  }
}
```

Implicit injections are difficult to understand, both because it's not obvious
that they exist, or where they come from.

In general, in order to migrate away from this pattern, you should use an
explicit injection instead of an implicit one. You can do this by using the
`@service` decorator wherever you are using the implicit injection currently.

Before:

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

In some cases, you may be using an injected value which is not a service.
Injections of non-service values do not have a direct explicit-injection
equivalent. As such, to migrate away from these, you will have to rewrite the
injection to use services instead.

Before:

```js
// app/initializers/logger.js
import EmberObject from '@ember/object';

export function initialize(application) {
  let Logger = EmberObject.extend({
    log(m) {
      console.log(m);
    }
  });

  application.register('logger:main', Logger);
  application.inject('route', 'logger', 'logger:main');
}

export default {
  name: 'logger',
  initialize: initialize
};
```
```js
// app/routes/application.js
export default class ApplicationRoute extends Route {
  model() {
    this.logger.log('fetching application model...');
    //...
  }
}
```

After:

```js
// app/services/logger.js
import Service from '@ember/service';

export class Logger extends Service {
  log(m) {
    console.log(m);
  }
}
```
```js
// app/routes/application.js
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service logger;

  model() {
    this.logger.log('fetching application model...');
    //...
  }
}
```

In cases where it is not possible to convert a custom injection type into a
service, the value can be accessed by looking it up directly on the container
instead using the [lookup](https://api.emberjs.com/ember/3.22/classes/ApplicationInstance/methods/lookup?anchor=lookup)
method:

```js
// app/routes/application.js
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  get logger() {
    if (this._logger === undefined) {
      this._logger = getOwner(this).lookup('logger:main');
    }

    return this._logger;
  }

  set logger(value) {
    this._logger = value;
  }

  model() {
    this.logger.log('fetching application model...');
    //...
  }
}
```

You should always include a setter until the implicit injection is removed,
since the container will still attempt to pass it into the class on creation,
and it will cause errors if it attempts to overwrite a value without a setter.
