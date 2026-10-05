---
title: 'ArrayProxy'
until: 8.0.0
since: 7.4.0
---

`ArrayProxy` from `@ember/array/proxy` is deprecated. Use a tracked array, or a plain array behind a `@tracked` property, instead.

### Swapping the underlying array

Before:

```javascript
import ArrayProxy from '@ember/array/proxy';
import { A } from '@ember/array';

let pets = ArrayProxy.create({ content: A(['dog', 'cat']) });

pets.get('firstObject'); // 'dog'

pets.set('content', A(['amoeba']));
pets.get('firstObject'); // 'amoeba'
```

After:

```javascript
import { tracked } from '@glimmer/tracking';

class PetStore {
  @tracked pets = ['dog', 'cat'];
}

let store = new PetStore();

store.pets[0]; // 'dog'

store.pets = ['amoeba'];
store.pets[0]; // 'amoeba'
```

### Mutating in place

Before:

```javascript
import ArrayProxy from '@ember/array/proxy';
import { A } from '@ember/array';

let pets = ArrayProxy.create({ content: A(['dog', 'cat']) });

pets.pushObject('fish');
pets.get('length'); // 3
```

After:

```javascript
import { trackedArray } from '@ember/reactive/collections';

let pets = trackedArray(['dog', 'cat']);

pets.push('fish');
pets.length; // 3
```

`trackedArray` from [`@ember/reactive/collections`](https://api.emberjs.com/ember/release/modules/@ember%2Freactive%2Fcollections/) is a native array whose mutations are tracked. 

### Sorted or filtered views (`arrangedContent`)

Before:

```javascript
import ArrayProxy from '@ember/array/proxy';
import { computed } from '@ember/object';
import { A } from '@ember/array';

class SortedPeople extends ArrayProxy {
  @computed('content.[]')
  get arrangedContent() {
    return this.content.sortBy('name');
  }
}

let people = SortedPeople.create({ content: A([{ name: 'Yehuda' }, { name: 'Tom' }]) });

people.get('firstObject').name; // 'Tom'
```

After:

```javascript
import { trackedArray } from '@ember/reactive/collections';
import { cached } from '@glimmer/tracking';

class People {
  all = trackedArray([{ name: 'Yehuda' }, { name: 'Tom' }]);

  @cached
  get sorted() {
    return this.all.toSorted((a, b) => a.name.localeCompare(b.name));
  }
}

let people = new People();

people.sorted[0].name; // 'Tom'

people.all.push({ name: 'Chris' });
people.sorted[0].name; // 'Chris'
```

`@cached` is optional. Without it the getter re-sorts on every read, which is fine for small lists.

### Transforming items (`objectAtContent`)

Before:

```javascript
import ArrayProxy from '@ember/array/proxy';
import { A } from '@ember/array';

class ShoutingPets extends ArrayProxy {
  objectAtContent(index) {
    return this.content.objectAt(index).toUpperCase();
  }
}

let pets = ShoutingPets.create({ content: A(['dog', 'cat']) });

pets.objectAt(0); // 'DOG'
```

After:

```javascript
import { trackedArray } from '@ember/reactive/collections';

class Pets {
  all = trackedArray(['dog', 'cat']);
}

let pets = new Pets();

pets.all[0].toUpperCase(); // 'DOG'
pets.all.at(-1).toUpperCase(); // 'CAT'
```

### When you must keep a stable array-shaped object

If a third-party consumer holds on to the object and expects it to act like an array while its contents are swapped, a native [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) over a tracked holder reproduces that:

```javascript
import { tracked } from '@glimmer/tracking';

class Holder {
  @tracked content;

  constructor(content) {
    this.content = content;
  }
}

export function swappableArray(initial) {
  let holder = new Holder(initial);

  return new Proxy(holder, {
    get(target, key, receiver) {
      if (key === 'content') return target.content;
      return Reflect.get(target.content, key, receiver);
    },
    set(target, key, value, receiver) {
      if (key === 'content') {
        target.content = value;
        return true;
      }
      return Reflect.set(target.content, key, value, receiver);
    },
    has: (target, key) => key in target.content,
    ownKeys: (target) => Reflect.ownKeys(target.content),
    getOwnPropertyDescriptor: (target, key) => Reflect.getOwnPropertyDescriptor(target.content, key),
  });
}
```

Treat this as a last resort. It is harder to debug than a tracked property and getter, and `Array.isArray` returns `false` for it.

### Computed properties that depended on the proxy

Computed properties with dependent keys such as `pets.[]` or `pets.@each.name` relied on `ArrayProxy` firing array change notifications. After migrating, convert those computed properties to native getters. Tracked arrays and tracked properties auto-track, so the dependent keys are no longer needed.

For more background, read [RFC 1112](https://github.com/emberjs/rfcs/pull/1112).
