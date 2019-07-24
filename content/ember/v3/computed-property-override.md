---
id: computed-property.override
title: Computed Property Overridability
until: '4.0.0'
since: '3.9'
---

Ember's computed properties are overridable by default if no setter is defined:

```js
const Person = EmberObject.extend({
  firstName: 'Diana',
  lastName: 'Prince',

  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  })
});

let person = Person.create();
person.fullName; // Diana Prince

person.set('fullName', 'Carol Danvers');

person.set('firstName', 'Bruce');
person.set('lastName', 'Wayne');


person.fullName; // Carol Danvers
```

This behavior is bug prone and has been deprecated. `readOnly()`, the modifier
that prevents this behavior, will be deprecated once overridability has been
removed.

If you still need this behavior, you can create a setter which accomplishes this
manually:

```js
const Person = EmberObject.extend({
  firstName: 'Diana',
  lastName: 'Prince',

  fullName: computed('firstName', 'lastName', {
    get() {
      if (this._fullName) {
        return this._fullName;
      }

      return `${this.firstName} ${this.lastName}`;
    },

    set(key, value) {
      return this._fullName = value;
    }
  })
});
```
