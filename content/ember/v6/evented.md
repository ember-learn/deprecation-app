---
title: Ember.Evented and @ember/object/events
until: 7.0.0
since: 6.6.0
---

The `Ember.Evented` mixin, the underlying `@ember/object/events` module (`addListener`, `removeListener`, `sendEvent`), and the `on()` function from `@ember/object/evented` are all deprecated.

These APIs provided a way for Ember objects to send and receive events. With modern JavaScript features and patterns, we recommend more explicit and standard approaches. For eventing, we recommend refactoring to use a modern asynchronous library like [emittery](https://www.npmjs.com/package/emittery) or (if you need to preserve synchronous semantics) a library such as [`nanoevents`](https://www.npmjs.com/package/nanoevents) or [`mitt`](https://www.npmjs.com/package/mitt).

> ⚠️ Important: `Ember.Evented` emits events *synchronously*. Changing to a library with asynchronous behavior, while recommended, may lead to subtle changes in your application's behavior.

Please note: The methods from `Evented` (`on`, `one`, `off`, `trigger`, `has`) were also available on `Ember.Component`, `Ember.Route`, and `Ember.Router`. While usage on these objects is deprecated, the methods will continue to be supported and not deprecated on the `RouterService`, since key parts of its functionality are difficult to reproduce without them.

### Replacing `Evented` with `emittery`

First, add `emittery` to your project:
```bash
npm install --save-dev emittery
# or
pnpm add --save-dev emittery
```

Here is an example of a session service that used `Evented`:

#### Before
```javascript
// app/services/session.js
import Service from '@ember/service';
import Evented from '@ember/object/evented';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service.extend(Evented) {
  @tracked user = null;

  login(userData) {
    this.user = userData;
    this.trigger('loggedIn', userData);
  }

  logout() {
    const oldUser = this.user;
    this.user = null;
    this.trigger('loggedOut', oldUser);
  }
}
```

A consumer might use it like this:

```javascript
// app/components/some-component.js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { registerDestructor } from '@ember/destroyable';

export default class SomeComponent extends Component {
  @service session;

  constructor(owner, args) {
    super(owner, args);
    this.session.on('loggedIn', this, 'handleLogin');

    registerDestructor(this, () => {
      this.session.off('loggedIn', this, 'handleLogin');
    });
  }

  handleLogin(user) {
    console.log(`User logged in: ${user.name}`);
    // ... update component state
  }
}
```

After refactoring to use `emittery`, the service manages its own event emitter and provides clear methods for subscribing.

#### After
```javascript
// app/services/session.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Emittery from 'emittery';

export default class SessionService extends Service {
  @tracked user = null;

  #emitter = new Emittery();

  login(userData) {
    this.user = userData;
    this.#emitter.emit('loggedIn', userData);
  }

  logout() {
    const oldUser = this.user;
    this.user = null;
    this.#emitter.emit('loggedOut', oldUser);
  }

  // Public subscription methods
  onLoggedIn(callback) {
    return this.#emitter.on('loggedIn', callback);
  }

  onLoggedOut(callback) {
    return this.#emitter.on('loggedOut', callback);
  }
}
```

The listening object can then use `registerDestructor` from `@ember/destroyable` to tie the subscription's lifetime to its own. This removes the need for a `willDestroy` hook and manual cleanup.

```javascript
// app/components/some-component.js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { registerDestructor } from '@ember/destroyable';

export default class SomeComponent extends Component {
  @service session;

  constructor(owner, args) {
    super(owner, args);

    const unsubscribe = this.session.onLoggedIn((user) => {
      this.handleLogin(user);
    });

    registerDestructor(this, unsubscribe);
  }

  handleLogin(user) {
    console.log(`User logged in: ${user.name}`);
    // ... update component state
  }
}
```
