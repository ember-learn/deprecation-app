---
title: 'this.get and this.set'
until: 8.0.0
since: 7.4.0
---

The `get` and `set` methods from `@ember/object/observable` are deprecated. This also applies to all built-in `Ember.Object` descendants.
To migrate, use native JavaScript getters and setters instead.

### Replacing `.get()`

Instead of using `.get()`, use standard property access.

**Before**

```javascript
import EmberObject from '@ember/object';

class Person extends EmberObject {
  name = 'John Doe';
  details = { 
    age: 30 
  };
}

const person = new Person();

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

Instead of using `.set()`, use standard property assignment.

**Before**

```javascript
import EmberObject from '@ember/object';

class Person extends EmberObject {
  name = 'John Doe';
}

const person = new Person();

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

