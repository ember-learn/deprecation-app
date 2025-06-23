---
title: Deprecation of ArrayProxy
until: 7.0.0
since: 6.5.0
---

`ArrayProxy` is deprecated. In modern Ember, you should use tracked arrays and modern patterns instead. The best replacement depends on how you were using `ArrayProxy`. Some example use cases are shown below.

## Recommended: Use Tracked Arrays

For most use cases, the modern Ember approach is to use tracked arrays from [`tracked-built-ins`](https://github.com/tracked-tools/tracked-built-ins):

```javascript
import { TrackedArray } from 'tracked-built-ins';

// Instead of ArrayProxy, use TrackedArray directly
const pets = new TrackedArray(['dog', 'cat', 'fish']);

// The array is automatically tracked and will update templates
pets.push('bird');
pets[0]; // 'dog'
pets.length; // 4
```

This provides automatic tracking without the complexity of proxies and follows modern Ember patterns.

## Advanced Use Cases

If you need more advanced behavior like content swapping or transformation, you can use the approaches below.

### Swapping Content

If you were using `ArrayProxy` to easily swap out the underlying array while keeping a stable reference, you can achieve a similar, transparent effect using a native `Proxy` backed by a class with a `@tracked` property.

Before:

```javascript
import ArrayProxy from '@ember/array/proxy';
import { A } from '@ember/array';

const pets = A(['dog', 'cat', 'fish']);
const proxy = ArrayProxy.create({ content: pets });

proxy.get('firstObject'); // 'dog'

// Later, you can easily swap the content
proxy.set('content', A(['amoeba', 'paramecium']));

proxy.get('firstObject'); // 'amoeba'
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
function createSwappableArray(initialContent) {
  const state = new SwappableState(initialContent);

  return new Proxy(state, {
  get(target, property, receiver) {
    // Allow getting/setting the content directly for swapping.
    if (property === 'content') {
      return target.content;
    }
    // Delegate all other property access to the content array.
    return Reflect.get(target.content, property, receiver);
  },
  set(target, property, value, receiver) {
    // Allow setting the content directly for swapping.
    if (property === 'content') {
      target.content = value;
      return true;
    }
    // Delegate all other property sets to the content array.
    return Reflect.set(target.content, property, value, receiver);
  },
  // Add other traps to make the proxy behave like a full array.
  has: (target, key) => key in target.content,
  ownKeys: (target) => Reflect.ownKeys(target.content),
  getOwnPropertyDescriptor: (target, key) => Reflect.getOwnPropertyDescriptor(target.content, key),
  defineProperty: (target, key, desc) => Reflect.defineProperty(target.content, key, desc),
  deleteProperty: (target, key) => Reflect.deleteProperty(target.content, key),
});
}

const pets = createSwappableArray(['dog', 'cat', 'fish']);

// Access the array transparently using native syntax.
pets[0]; // 'dog'
pets.length; // 3

// Later, you can easily swap the content.
// Any part of your app observing this will update because
// the underlying state is tracked.
pets.content = ['amoeba', 'paramecium'];

pets[0]; // 'amoeba'
pets.length; // 2
```

### Transforming Content

If you were using `objectAtContent` to transform the array's content, you can use a native JavaScript `Proxy` to achieve the same result with standard array syntax.

Before:

```javascript
import ArrayProxy from '@ember/array/proxy';

let pets = ['dog', 'cat', 'fish'];
let proxy = ArrayProxy.create({
  content: pets,
  objectAtContent(idx) {
    return this.get('content').objectAt(idx).toUpperCase();
  }
});

proxy.get('firstObject'); // 'DOG'
proxy.objectAt(1);      // 'CAT'
```

After:

```javascript
const pets = ['dog', 'cat', 'fish'];

const transformedPets = new Proxy(pets, {
  get(target, property, receiver) {
    // Check if the property is an array index.
    if (typeof property === 'string' && /^\d+$/.test(property)) {
      const index = parseInt(property, 10);
      const value = target[index];
      return typeof value === 'string' ? value.toUpperCase() : value;
    }

    // For other properties like 'length', delegate to the original array.
    return Reflect.get(target, property, receiver);
  }
});

// Now you can access the transformed items using native array syntax.
transformedPets[0]; // 'DOG'
transformedPets[1]; // 'CAT'

// Other array properties work as expected.
transformedPets.length; // 3
```

### Sorted or Filtered Content (`arrangedContent`)

If you were using `arrangedContent` to provide a sorted or filtered view of an array, the modern approach is to use tracked properties and getters:

Before:

```javascript
import ArrayProxy from '@ember/array/proxy';
import { computed } from '@ember/object';
import { A } from '@ember/array';

const people = A([{name: 'Yehuda'}, {name: 'Tom'}]);

const proxy = ArrayProxy.extend({
  arrangedContent: computed('content.[]', function() {
    // In classic Ember, `sortBy` was a common way to do this.
    return this.get('content').sortBy('name');
  })
}).create({ content: people });

proxy.get('arrangedContent.firstObject.name'); // 'Tom'

// Mutating the content...
people.pushObject({ name: 'Chris' });

// ...is reflected in arrangedContent.
proxy.get('arrangedContent.firstObject.name'); // 'Chris'
```

After (modern Ember approach with tracked properties):

```javascript
import { TrackedArray } from 'tracked-built-ins';
import { cached } from '@glimmer/tracking';

class PeopleManager {
  // Use TrackedArray for automatic reactivity
  people = new TrackedArray([{name: 'Yehuda'}, {name: 'Tom'}]);

  @cached
  get arrangedContent() {
    // Automatically recomputes when people array changes
    return [...this.people].sort((a, b) => a.name.localeCompare(b.name));
  }
}

const manager = new PeopleManager();
manager.arrangedContent[0].name; // 'Tom'

// Mutating the content...
manager.people.push({ name: 'Chris' });

// ...is reflected in arrangedContent due to @cached and TrackedArray.
manager.arrangedContent[0].name; // 'Chris'
```

For more complex use cases where you need a native `Proxy` for dynamic behavior:

```javascript
// The original data, which can be mutated.
const people = [{name: 'Yehuda'}, {name: 'Tom'}];

// A cache for the sorted version.
let sortedCache = null;
let isDirty = true;

const peopleProxy = new Proxy(people, {
  get(target, property, receiver) {
    // Intercept access to a special 'arranged' property.
    if (property === 'arranged') {
      if (isDirty) {
        // The cache is dirty, so we re-compute the sorted array.
        sortedCache = [...target].sort((a, b) => a.name.localeCompare(b.name));
        isDirty = false;
      }
      return sortedCache;
    }
    
    // For any other property, delegate to the original array.
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    // Any mutation to the array marks the cache as dirty.
    isDirty = true;
    return Reflect.set(target, property, value, receiver);
  }
});

// Access the sorted content via the `arranged` property.
peopleProxy.arranged[0].name; // 'Tom'

// Mutate the original data through the proxy.
peopleProxy.push({ name: 'Chris' });

// The `arranged` property now reflects the change because the cache was invalidated.
peopleProxy.arranged[0].name; // 'Chris'
```

## Migration Strategy

When migrating from `ArrayProxy`, consider:

1. **First choice**: Use `TrackedArray` from `tracked-built-ins` for automatic reactivity
2. **For computed arrays**: Use `@cached` getters with tracked data
3. **Only if needed**: Use native `Proxy` for complex dynamic behavior that can't be achieved with tracked properties

The modern Ember approach favors explicit tracking and computed properties over proxy-based solutions, which are easier to understand, debug, and optimize.
