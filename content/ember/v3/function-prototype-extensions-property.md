---
id: function-prototype-extensions.property
title: Function.prototype.property
until: '4.0.0'
since: '3.11'
---

Historically, Ember has extended the `Function.prototype` with a few functions
(`on`, `observes`, `property`), over time we have moved away from using these
prototype extended functions in favor of using the official ES modules based
API.

In order to migrate away from `Function.prototype.property` you would update to using
`computed` from `@ember/object` ([see
documentation](https://api.emberjs.com/ember/release/functions/@ember%2Fobject/computed))
directly.

For example, you would migrate from:

```js
import EmberObject from '@ember/object';

let Person = EmberObject.extend({
  init() {
    this._super(...arguments);

    this.firstName = 'Betty';
    this.lastName = 'Jones';
  },

  fullName: function() {
    return `${this.firstName} ${this.lastName}`;
  }.property('firstName', 'lastName')
});

let client = Person.create();

client.get('fullName'); // 'Betty Jones'

client.set('lastName', 'Fuller');
client.get('fullName'); // 'Betty Fuller'
```

Into:

```js
import EmberObject, { computed } from '@ember/object';

let Person = EmberObject.extend({
  init() {
    this._super(...arguments);

    this.firstName = 'Betty';
    this.lastName = 'Jones';
  },

  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  })
});

let client = Person.create();

client.get('fullName'); // 'Betty Jones'

client.set('lastName', 'Fuller');
client.get('fullName'); // 'Betty Fuller'
```

Please review the deprecation RFC over at
[emberjs/rfcs](https://emberjs.github.io/rfcs/0272-deprecation-native-function-prototype-extensions.html)
for more details.
