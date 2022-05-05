---
id: deprecate-array-prototype-extensions
title: "Deprecate array prototype extensions"
until: '6.0.0'
since: '5.0.0'
---

Ember historically extended the prototypes of native Javascript arrays to implement `Ember.Enumerable`, `Ember.MutableEnumerable`, `Ember.MutableArray`, `Ember.Array`. As of v5, the usages of array prototype extensions are deprecated.

For convenient functions like `filterBy`, `compact`, you can directly convert to use native array methods.

For mutation functions (like `pushObject`, `replace`) or observable properties (`firstObject`, `lastObject`), in order to keep the reactivity, you should take following steps:
1. convert the array either to a new `@tracked` property, or use `TrackedArray` from `tracked-built-ins`;
2. use array native methods;
3. fully test to make sure the reactivity is maintained.

### Convenient Functions
For convenient functions like `filterBy`, `compact`, you can directly convert to use native array methods. This includes following (a list from [`EmberArray` methods](https://api.emberjs.com/ember/release/classes/EmberArray)):

* `any`
* `compact`
* `filterBy`
* `findBy`
* `getEach`
* `invoke`
* `isAny`
* `isEvery`
* `mapBy`
* `objectAt`
* `objectsAt`
* `reject`
* `rejectBy`
* `sortBy`
* `toArray`
* `uniq`
* `uniqBy`

Before:

```js
const simpleArray = [1, 2, 3, undefined, 3];
const complexArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];

simpleArray.any(value => value === 1);  // true
simpleArray.compact(); // [1, 2, 3, 3]
complexArray.filterBy('food', 'beans'); // [{ food: 'beans', isFruit: false }]
complexArray.findBy('isFruit'); // { food: 'apple', isFruit: true }
complexArray.getEach('food'); // ['apple', 'beans']
complexArray.isAny('isFruit'); // true
complexArray.isEvery('isFruit'); // false
complexArray.mapBy('food'); // ['apple', 'beans']
simpleArray.objectAt(1) // 2
simpleArray.objectsAt([1, 2]) // [2, 3]
complexArray.reject(el => el.isFruit) // [{ food: 'apple', isFruit: true }]
complexArray.rejectBy('isFruit') // [{ food: 'apple', isFruit: true }]
complexArray.toArray(); // [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }]
simpleArray.uniq() // [1, 2, 3, undefined]
complexArray.sortBy('food', 'isFruit'); // [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }]
complexArray.uniqBy('food'); // [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }]

// invoke
class Person {
  name;

  constructor(name) {
    this.name = name;
  }

  greet(prefix = 'Hello') {
    return `${prefix} ${this.name}`;
  }
}

[new Person('Tom'), new Person('Joe')].invoke('greet', 'Hi'); // ['Hi Tom', 'Hi Joe']
```

After:

```js
import { get } from '@ember/object';
import { sortBy, uniqBy } from 'lodash-es';

const simpleArray = [1, 2, 3, undefined];
const complexArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];

// any
simpleArray.some(value => value === 1);  // true
// compact
simpleArray.filter(value => value !== null && value !== undefined);; // [1, 2, 3]
// filterBy
complexArray.filter(el => get(el, 'food') === 'beans'); // [{ food: 'beans', isFruit: false }]
// findBy
complexArray.find(el => get(el, 'isFruit')); // { food: 'apple', isFruit: true }
// getEach
complexArray.map(el => get(el, 'food')); // ['apple', 'beans']
// isAny
complexArray.any(el => el.isFruit); // true
// isEvery
complexArray.every(el => el.isFruit); // false
// mapBy
complexArray.map(el => el.food); // ['apple', 'beans']
// objectAt
simpleArray[1] // 2
// objectsAt
[1, 3].map(index => simpleArray[index]); //[2, 3]
// reject
complexArray.filter(el => !el.isFruit) // [{ food: 'apple', isFruit: true }]
// rejectBy
complexArray.filter(el => !el.isFruit) // [{ food: 'apple', isFruit: true }]
// toArray
[...complexArray] // [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }]
// uniq
[...new Set(simpleArray)] // [1, 2, 3, undefined]

// You may also instead rely on methods from another library like [lodash](https://lodash.com/).
// Keep in mind that different libraries will behave in slightly different ways, so make sure any critical transformations are thoroughly tested.

// sortBy
sortBy(complexArray, ['food', 'isFruit']); // [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }]
// uniqBy
uniqBy(complexArray, 'food'); // [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }]

// invoke
class Person {
  name;

  constructor(name) {
    this.name = name;
  }

  greet(prefix = 'Hello') {
    return `${prefix} ${this.name}`;
  }
}

[new Person('Tom'), new Person('Joe')].map(person => person['greet']?.('Hi')); // ['Hi Tom', 'Hi Joe']
```

#### Some special cases
##### `without`
Before
```js
const simpleArray = ['a', 'b', 'c'];

simpleArray.without('a'); // ['b', 'c']
```

After
```js
const simpleArray = ['a', 'b', 'c'];

simpleArray.filter(el => el !== 'a'); // ['b', 'c']
```

Please make sure `without` reactivity is fully tested.

##### `setEach`
`setEach` method internally implements `set` which responds to reactivity. You can either also use `set` or convert to `@tracked` properties.

Before
```js
const items = [{ name: 'Joe' }, { name: 'Matt' }];

items.setEach('zipCode', '10011'); // items = [{ name: 'Joe', zipCode: '10011' }, { name: 'Matt', zipCode: '10011' }]
```

After
```js
// use `set`
import { set } from '@ember/object';

const items = [{ name: 'Joe' }, { name: 'Matt' }];

items.forEach(item => {
  set(item, 'zipCode', '10011');
}); // items = [{ name: 'Joe', zipCode: '10011' }, { name: 'Matt', zipCode: '10011' }]
```

or
```js
// use `@tracked`
import { tracked } from '@glimmer/tracking';

class Person {
  name;
  @tracked zipCode;
  constructor({ name, zipCode }) {
    this.name = name;
    this.zipCode = zipCode;
  }
}

const items = new TrackedArray([
  new Person({ name: 'Joe' }),
  new Person({ name: 'Matt' }),
]);

items.forEach(item => {
  item.zipCode = '10011';
}); // items = [{ name: 'Joe', zipCode: '10011' }, { name: 'Matt', zipCode: '10011' }]
```

### Observable Properties
`firstObject`, `lastObject` are observable properties. Changing directly from `firstObject` to `at(0)` or `[0]` might cause issues that the properties are no longer reactive.

#### Used in template
If the `firstObject` and `lastObject` are used in a template, you can convert to use `get` helper safely as `get` helper handles the reactivity already.

Before
```hbs
<Foo @bar={{@list.firstObject.name}} />
```

After
```hbs
<Foo @bar={{get @list '0.name'}} />
```

You can also leverage fixers provided by [`ember-template-lint/no-array-prototype-extensions`](https://github.com/ember-template-lint/ember-template-lint/blob/master/docs/rule/no-array-prototype-extensions.md).

#### Used in js
If the `firstObject` and `lastObject` are used in js files and you used them in an observable way, you will need to convert the accessors to `@tracked` array or `TrackedArray`.

Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  // lastObj will change when `someAction` is executed
  get lastObj() {
    return this.abc.lastObject;
  }

  @action
  someAction(value) {
    this.abc.pushObject(value);
  }
}
```

After
```js
// TrackedArray
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { TrackedArray } from 'tracked-built-ins';

export default class SampleComponent extends Component {
  abc = new TrackedArray();

  get lastObj() {
    return this.abc.at(-1);
  }

  @action
  someAction(value) {
    this.abc.push(value);
  }
}
```
or

```js
// @tracked
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SampleComponent extends Component {
  @tracked abc = [];

  get lastObj() {
    return this.abc.at(-1);
  }

  @action
  someAction(value) {
    this.abc = [...this.abc, value];
  }
}
```

### Mutation methods
Mutation methods are observable-based, which means you should always convert the accessors to `@tracked` or `TrackedArray` in order to maintain the reactivity. This includes following (a list from [`MutableArray` methods](https://api.emberjs.com/ember/4.3/classes/MutableArray)):

* `without`
* `addObject`
* `addObjects`
* `clear`
* `insertAt`
* `popObject`
* `pushObject`
* `pushObjects`
* `removeAt`
* `removeObject`
* `removeObjects`
* `replace`
* `reverseObjects`
* `setObjects`
* `shiftObject`
* `unshiftObject`
* `unshiftObjects`

Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  pushAction(value) {
    this.abc.pushObject(value);
  }

  @action
  removeAction(value) {
    this.abc.removeObject(value);
  }
}
```

After
```js
// TrackedArray
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { TrackedArray } from 'tracked-built-ins';

export default class SampleComponent extends Component {
  abc = new TrackedArray();

  @action
  pushAction(value) {
    this.abc.push(value);
  }

  @action
  removeAction(value) {
    let loc = this.abc.length || 0;
    while (--loc >= 0) {
      let curValue = this.abc.at(loc);

      if (curValue === value) {
        this.abc.splice(loc, 1);
      }
    }
  }
}
```
or

```js
// @tracked
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SampleComponent extends Component {
  @tracked abc = [];

  @action
  pushAction(value) {
    this.abc = [...this.abc, value];
  }

  @action
  removeAction(value) {
    let loc = this.abc.length || 0;
    while (--loc >= 0) {
      let curValue = this.abc.at(loc);

      if (curValue === value) {
        this.abc.splice(loc, 1);
      }
    }
    this.abc = [...this.abc];
  }
}
```

It's always recommended to reference the existing implementation of the method you are trying to convert. This can make sure functionalities are kept as it was. Implementation details can be found in [`MutableArray`](https://api.emberjs.com/ember/release/classes/MutableArray), for example [`removeObject`](https://github.com/emberjs/ember.js/blob/v4.3.0/packages/%40ember/-internals/runtime/lib/mixins/array.js#L1619).



