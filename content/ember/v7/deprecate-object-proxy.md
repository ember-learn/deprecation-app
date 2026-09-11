---
title: 'ObjectProxy'
until: 8.0.0
since: 7.4.0
---

`ObjectProxy` from `@ember/object/proxy` is deprecated. Use tracked properties and direct property access, or a native `Proxy` for the rare cases that need interception.

`ObjectProxy` forwarded reads and writes of unknown properties to a `content` object. It was mostly used to swap that object out from under consumers, or to add computed properties on top of it. Tracked state covers both.

Pick the section below that matches how you used it.

### Swapping the wrapped object

Before:

```javascript
import ObjectProxy from '@ember/object/proxy';

let person = ObjectProxy.create({ content: { name: 'Tom' } });

person.get('name'); // 'Tom'

person.set('content', { name: 'Thomas' });
person.get('name'); // 'Thomas'
```

After:

```javascript
import { tracked } from '@glimmer/tracking';

class CurrentUser {
  @tracked person = { name: 'Tom' };
}

let current = new CurrentUser();

current.person.name; // 'Tom'

current.person = { name: 'Thomas' };
current.person.name; // 'Thomas'
```

Templates and getters that read `current.person.name` update when `person` is reassigned.

### Adding properties on top of the wrapped object

Before:

```javascript
import ObjectProxy from '@ember/object/proxy';
import { computed } from '@ember/object';

class PersonPresenter extends ObjectProxy {
  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }
}

let presenter = PersonPresenter.create({
  content: { firstName: 'Tom', lastName: 'Dale' },
});

presenter.get('fullName'); // 'Tom Dale'
presenter.get('firstName'); // 'Tom'
```

After, when you own the object, make it a class with the getter on it:

```javascript
import { tracked } from '@glimmer/tracking';

class Person {
  @tracked firstName;
  @tracked lastName;

  constructor({ firstName, lastName }) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

let person = new Person({ firstName: 'Tom', lastName: 'Dale' });

person.fullName; // 'Tom Dale'
person.firstName; // 'Tom'
```

After, when you do not own the object, wrap it in a class that exposes what you need:

```javascript
import { tracked } from '@glimmer/tracking';

class PersonPresenter {
  @tracked person;

  constructor(person) {
    this.person = person;
  }

  get fullName() {
    return `${this.person.firstName} ${this.person.lastName}`;
  }
}

let presenter = new PersonPresenter({ firstName: 'Tom', lastName: 'Dale' });

presenter.fullName; // 'Tom Dale'
presenter.person.firstName; // 'Tom'
```

Reading `presenter.person.firstName` instead of `presenter.firstName` is the intended change. Explicit access is easier to type-check and to follow than forwarding.

### Forwarding an open-ended set of properties

If consumers read arbitrary keys through the wrapper and you cannot change them, a native [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) reproduces the forwarding:

```javascript
let person = { firstName: 'Tom', lastName: 'Dale' };

let presenter = new Proxy(person, {
  get(target, key, receiver) {
    if (key === 'fullName') {
      return `${target.firstName} ${target.lastName}`;
    }
    return Reflect.get(target, key, receiver);
  },
});

presenter.fullName; // 'Tom Dale'
presenter.firstName; // 'Tom'
```

To also swap the target later, keep the target in a `@tracked` property on a holder and forward through `target.content`, as shown in the [`ArrayProxy` guide](/id/deprecate-array-proxy).

### `unknownProperty` and `setUnknownProperty`

The `get` and `set` traps of a native `Proxy` are the direct replacement.

Before:

```javascript
import ObjectProxy from '@ember/object/proxy';

class Defaults extends ObjectProxy {
  unknownProperty(key) {
    return this.content[key] ?? `missing:${key}`;
  }
}

let settings = Defaults.create({ content: { theme: 'dark' } });

settings.get('theme'); // 'dark'
settings.get('locale'); // 'missing:locale'
```

After:

```javascript
let settings = new Proxy(
  { theme: 'dark' },
  {
    get(target, key, receiver) {
      return key in target ? Reflect.get(target, key, receiver) : `missing:${String(key)}`;
    },
  }
);

settings.theme; // 'dark'
settings.locale; // 'missing:locale'
```

### Computed properties that depended on the proxy

Computed properties with dependent keys such as `content.firstName` relied on `ObjectProxy` notifying changes through `content`. After migrating, convert those computed properties to native getters. Tracked properties auto-track, so the dependent keys are no longer needed.

For more background, read [RFC 1112](https://github.com/emberjs/rfcs/pull/1112).
