---
title: Ember.Evented and @ember/object/events
until: 8.0.0
since: 7.4.0
---

The `Ember.Evented` mixin, the underlying `@ember/object/events` module (`addListener`, `removeListener`, `sendEvent`), and the `on()` function from `@ember/object/evented` are all deprecated.

These APIs provided a way for Ember objects to send and receive events. Most existing usage is not really eventing: it is one object telling another object to update state that it could have read directly. Migrate in this order, and stop at the first step that applies:

1. Derive the state. Replace the event and the listener's copy of the state with a getter that reads tracked state from the source. This removes the subscription entirely.
2. Call the method directly. When the emitter already knows its one consumer, an event adds indirection without decoupling anything.
3. Use an event emitter library. Only when the emitter must not know who is listening.

Please note: The methods from `Evented` (`on`, `one`, `off`, `trigger`, `has`) were also available on `Ember.Component`, `Ember.Route`, and `Ember.Router`. While usage on these objects is deprecated, the methods will continue to be supported and not deprecated on the `RouterService`, since key parts of its functionality are difficult to reproduce without them.

### Prefer derived state

Events were commonly used to push a value from one object into another so that the second object could re-render. Tracked properties already do this. The listener does not need its own copy of the value, and it does not need a subscription: it reads the value from the source, and Ember invalidates whatever consumed it.

Here is a session service that uses `Evented` to announce a login:

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

```javascript
// app/components/greeting.js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';

export default class GreetingComponent extends Component {
  @service session;

  @tracked greeting = 'Please sign in';

  constructor(owner, args) {
    super(owner, args);
    this.session.on('loggedIn', this, 'handleLogin');
    this.session.on('loggedOut', this, 'handleLogout');

    registerDestructor(this, () => {
      this.session.off('loggedIn', this, 'handleLogin');
      this.session.off('loggedOut', this, 'handleLogout');
    });
  }

  handleLogin(user) {
    this.greeting = `Welcome back, ${user.name}`;
  }

  handleLogout() {
    this.greeting = 'Please sign in';
  }
}
```

The service owns the tracked state. The component derives from it:

#### After
```javascript
// app/services/session.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service {
  @tracked user = null;

  login(userData) {
    this.user = userData;
  }

  logout() {
    this.user = null;
  }
}
```

```javascript
// app/components/greeting.js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class GreetingComponent extends Component {
  @service session;

  get greeting() {
    let { user } = this.session;

    return user ? `Welcome back, ${user.name}` : 'Please sign in';
  }
}
```


Often the getter is not needed either, because the template can derive the value:

```handlebars
{{#if this.session.user}}
  Welcome back, {{this.session.user.name}}
{{else}}
  Please sign in
{{/if}}
```

The same rewrite applies to state that is computed from the event payload. A component that listened for `recordsLoaded` to recount a list should read the list and count it in a getter:

```javascript
get completedCount() {
  return this.todos.items.filter((item) => item.isComplete).length;
}
```

Derived state cannot go stale, and there is no listener left to leak.

### Call methods directly

Sometimes an event does trigger real work rather than a state update, such as clearing a cache or starting a request. If the object that triggers the event already knows the object that handles it, replace the event with a method call:

#### Before
```javascript
// app/services/session.js
export default class SessionService extends Service.extend(Evented) {
  logout() {
    this.user = null;
    this.trigger('loggedOut');
  }
}

// app/services/cart.js
export default class CartService extends Service {
  @service session;

  constructor() {
    super(...arguments);
    this.session.on('loggedOut', this, 'clear');
  }

  clear() { /* ... */ }
}
```

#### After
```javascript
// app/services/session.js
export default class SessionService extends Service {
  @service cart;

  logout() {
    this.user = null;
    this.cart.clear();
  }
}

// app/services/cart.js
export default class CartService extends Service {
  clear() { /* ... */ }
}
```

The call is type-safe, and `logout` now states what it does instead of hiding the wiring in a subscription registered somewhere else.

### Use an event emitter library

Reach for a library only when the first two steps do not apply: the set of subscribers is open, and the emitter must not know who is listening. Public API surfaces of addons are the common case.

We recommend a modern asynchronous library like [emittery](https://www.npmjs.com/package/emittery) or (if you need to preserve synchronous semantics) a library such as [`nanoevents`](https://www.npmjs.com/package/nanoevents) or [`mitt`](https://www.npmjs.com/package/mitt).

> ⚠️ Important: `Ember.Evented` emits events *synchronously*. Changing to a library with asynchronous behavior, while recommended, may lead to subtle changes in your application's behavior.

First, add `emittery` to your project:
```bash
npm install --save-dev emittery
# or
pnpm add --save-dev emittery
```

Using the session service again, the service manages its own event emitter and provides clear methods for subscribing.

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
