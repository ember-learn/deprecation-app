---
title: Deprecation of ObjectProxy
until: 7.0.0
since: 6.5.0
---

`ObjectProxy` is deprecated. In modern Ember, you should use tracked properties and native JavaScript patterns instead. The best replacement depends on how you were using `ObjectProxy`. Some example use cases are shown below.

## Recommended: Use Tracked Properties

For most use cases, the modern Ember approach is to use tracked properties directly:

```javascript
import { tracked } from '@glimmer/tracking';

class PersonManager {
  @tracked person = { name: 'Tom' };

  // Easy to swap content and templates will update automatically
  updatePerson(newPerson) {
    this.person = newPerson;
  }
}
```

This provides automatic tracking without the complexity of proxies and follows modern Ember patterns.

## Advanced Use Cases

If you need more advanced behavior like content swapping with a stable reference or property interception, you can use the approaches below.

### Swapping Content

If you were using `ObjectProxy` to easily swap out the underlying object while keeping a stable reference, you can achieve a similar, transparent effect using a native `Proxy` backed by a class with a `@tracked` property.

Before:

```javascript
import ObjectProxy from '@ember/object/proxy';

const person = { name: 'Tom' };
const proxy = ObjectProxy.create({ content: person });

proxy.get('name'); // 'Tom'

// Later, you can easily swap the content
proxy.set('content', { name: 'Thomas' });

proxy.get('name'); // 'Thomas'
```

After:

```javascript
import { tracked } from '@glimmer/tracking';

// A helper class to hold the tracked state.
class SwappableState {
  @tracked content;

  constructor(initialContent) {
    this.content = initialContent;
  }
}

// A factory function to create a proxy that is transparent
// and allows swapping the underlying content.
function createSwappableObject(initialContent) {
  const state = new SwappableState(initialContent);

  return new Proxy(state, {
    get(target, property, receiver) {
      // Allow getting/setting the content directly for swapping.
      if (property === 'content') {
        return target.content;
      }
      // Delegate all other property access to the content object.
      return Reflect.get(target.content, property, receiver);
    },
    set(target, property, value, receiver) {
      // Allow setting the content directly for swapping.
      if (property === 'content') {
        target.content = value;
        return true;
      }
      // Delegate all other property sets to the content object.
      return Reflect.set(target.content, property, value, receiver);
    },
    // Add other traps to make the proxy behave like a full object.
    has: (target, key) => key in target.content,
    ownKeys: (target) => Reflect.ownKeys(target.content),
    getOwnPropertyDescriptor: (target, key) => Reflect.getOwnPropertyDescriptor(target.content, key),
    defineProperty: (target, key, desc) => Reflect.defineProperty(target.content, key, desc),
    deleteProperty: (target, key) => Reflect.deleteProperty(target.content, key),
  });
}

const person = createSwappableObject({ name: 'Tom' });

// Access properties transparently.
person.name; // 'Tom'

// Later, you can easily swap the content.
// Any part of your app observing this will update because
// the underlying state is tracked.
person.content = { name: 'Thomas' };

person.name; // 'Thomas'
```

### Adding/Overriding Properties

If you had computed properties on your proxy or were using it to add or override behavior, you often don't need a proxy at all. You can simply add a getter to the object:

Before:

```javascript
import ObjectProxy from '@ember/object/proxy';
import { computed } from '@ember/object';

const ProxyWithComputedProperty = ObjectProxy.extend({
  fullName: computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
});

let proxy = ProxyWithComputedProperty.create({
  content: { firstName: 'Tom', lastName: 'Dale' }
});

proxy.get('fullName'); // 'Tom Dale'
```

After:

```javascript
const person = {
  firstName: 'Tom',
  lastName: 'Dale',
  get fullName() {
    // or person.firstName person.lastName
    return `${this.firstName} ${this.lastName}`;
  }
};

person.fullName; // 'Tom Dale'
person.firstName; // 'Tom'
```

If you need to add properties to an object you can't modify, you can use a native `Proxy`:

```javascript
const person = { firstName: 'Tom', lastName: 'Dale' };

const personProxy = new Proxy(person, {
  get(target, property, receiver) {
    if (property === 'fullName') {
      return `${target.firstName} ${target.lastName}`;
    }
    return Reflect.get(target, property, receiver);
  }
});

personProxy.fullName; // 'Tom Dale'
personProxy.firstName; // 'Tom'
```

### Handling Unknown Properties (`unknownProperty`)

For more advanced use cases, `ObjectProxy` provided an `unknownProperty` hook to handle access to properties that don't exist. The `get` trap in a native `Proxy` provides the same capability.

Before:

```javascript
import ObjectProxy from '@ember/object/proxy';

const proxy = ObjectProxy.extend({
  unknownProperty(key) {
    return `Property '${key}' does not exist.`;
  }
}).create({
  content: { a: 1 }
});

proxy.get('a'); // 1
proxy.get('b'); // "Property 'b' does not exist."
```

After:

```javascript
const data = { a: 1 };

const handler = {
  get(target, key, receiver) {
    if (key in target) {
      return Reflect.get(target, key, receiver);
    }
    return `Property '${key}' does not exist.`;
  }
};

const proxy = new Proxy(data, handler);

proxy.a; // 1
proxy.b; // "Property 'b' does not exist."
```

## Migration Strategy

When migrating from `ObjectProxy`, consider:

1. **First choice**: Use `@tracked` properties and direct object access
2. **For computed properties**: Add getters directly to objects when possible
3. **Only if needed**: Use native `Proxy` for dynamic property access or when you can't modify the original object

The modern Ember approach favors explicit tracked properties and direct object access over proxy-based solutions, which are easier to understand, debug, and have better performance characteristics.
