---
title: Deprecation of @ember/object/observable
until: 7.0.0
since: 6.5.0
---

The `get` and `set` methods from `@ember/object/observable` are deprecated. You should use native JavaScript getters and setters instead. This also applies to all built-in `Ember.Object` descendants.

### Replacing `.get()`

Instead of using `.get()`, you can now use standard property access.

**Before**

```javascript
import EmberObject from '@ember/object';

const person = EmberObject.create({
  name: 'John Doe',
  details: {
    age: 30
  }
});

const name = person.get('name');
const age = person.get('details.age');
```

**After**

```javascript
class Person {
  name = 'John Doe';
  details = {
    age: 30
  };
}

const person = new Person();

const name = person.name;
const age = person.details.age;
```

For nested properties that might be null or undefined, use the optional chaining operator (`?.`):

```javascript
const street = person.address?.street;
```

### Replacing `.set()`

Instead of using `.set()`, you can now use standard property assignment.

**Before**

```javascript
import EmberObject from '@ember/object';

const person = EmberObject.create({
  name: 'John Doe'
});

person.set('name', 'Jane Doe');
```

**After**

```javascript
import { tracked } from '@glimmer/tracking';

class Person {
  @tracked name = 'John Doe';
}

const person = new Person();

person.name = 'Jane Doe';
```

### A Note on Legacy Computed Properties and Setters

When working with classic `EmberObject` instances, the way you set properties matters for reactivity.

#### Updating Plain Properties

To trigger reactivity (like re-computing a dependent computed property) when changing a plain property on a classic object, you **must** use the `set` function. A native JavaScript assignment (`person.firstName = 'Jane'`) will change the value but will **not** trigger reactivity.

```javascript
import { computed, set } from '@ember/object';
import EmberObject from '@ember/object';

const Person = EmberObject.extend({
  // These properties are NOT tracked
  firstName: 'John',
  lastName: 'Doe',

  fullName: computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
});

const person = Person.create();
console.log(person.fullName); // 'John Doe'

// You MUST use `set` to update the plain property for the
// computed property to react.
set(person, 'firstName', 'Jane');

console.log(person.fullName); // 'Jane Doe'
```

#### Updating Computed Properties with Setters

In contrast, if a computed property is defined with its own setter, you **can** use a native JavaScript assignment to update it. Ember will correctly intercept this and run your setter logic.

```javascript
import { computed } from '@ember/object';
import EmberObject from '@ember/object';

const Person = EmberObject.extend({
  firstName: 'John',
  lastName: 'Doe',

  fullName: computed('firstName', 'lastName', {
    get() {
      return `${this.get('firstName')} ${this.get('lastName')}`;
    },
    set(key, value) {
      const [firstName, lastName] = value.split(' ');
      // Note: `this.set` is still used inside the setter itself
      this.set('firstName', firstName);
      this.set('lastName', lastName);
      return value;
    }
  })
});

const person = Person.create();

// You CAN use a native setter on a computed property with a setter.
person.fullName = 'Jane Doe';

console.log(person.firstName); // 'Jane'
console.log(person.lastName); // 'Doe'
```

However, for any properties that you use directly in a Glimmer template (`{{this.myProp}}`), you should always use `@tracked` to ensure the template updates when the property changes.
