---
id: deprecate-array-prototype-extensions
title: "Deprecate array prototype extensions"
until: '6.0.0'
since: '5.10.0'
---

Ember historically extended the prototypes of native Javascript arrays to implement `Ember.Enumerable`, `Ember.MutableEnumerable`, `Ember.MutableArray`, `Ember.Array`. As of v5, the usages of array prototype extensions are deprecated.

For convenient functions like `filterBy`, `compact`, you can directly convert to use native array methods.

For mutation functions (like `pushObject`, `replace`) or observable properties (`firstObject`, `lastObject`), in order to keep the reactivity, you should take following steps:
1. convert the array either to a new `@tracked` property, or use `TrackedArray` from `tracked-built-ins`;
2. use array native methods;
3. fully test to make sure the reactivity is maintained.

## Convenient Functions
For convenient functions like `filterBy`, `compact`, you can directly convert to use native array methods. This includes following (a list from [`EmberArray` methods](https://api.emberjs.com/ember/release/classes/EmberArray)):

#### `any`

Before:
```js
someArray.any(callbackFn);
```

After:
```js
someArray.some(callbackFn);
```
#### `compact`

Before:
```js
someArray.compact();
```

After:
```js
someArray.filter(val => val !== undefined && val !== null);
```
#### `filterBy`

Before:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.filterBy('food', 'beans'); // [{ food: 'beans', isFruit: false }]
```

After:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.filter(el => el.food === 'beans'); // [{ food: 'beans', isFruit: false }]
```
#### `findBy`

Before:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.findBy('isFruit'); // { food: 'apple', isFruit: true }
```

After:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.find(el => el.isFruit); // { food: 'apple', isFruit: true }
```
#### `getEach`

Before:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.getEach('food'); // ['apple', 'beans']
```

After:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.map(el => el.food); // ['apple', 'beans']
```

#### `invoke`

Before:
```js
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
#### `isAny`

Before
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.isAny('isFruit'); // true
```

After:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.some(el => el.isFruit); // true
```

#### `isEvery`
Before:

```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.isEvery('isFruit'); // false
```

After:

```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.every(el => el.isFruit); // false
```
#### `mapBy`

Before:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.mapBy('food'); // ['apple', 'beans']
```

After:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.map(el => el.food); // ['apple', 'beans']
```

#### `objectAt`

Before
```js
const someArray = [1, 2, 3, undefined];
someArray.objectAt(1); // 2
```

After:
```js
const someArray = [1, 2, 3, undefined];
someArray[1] // 2
```

#### `objectsAt`

Before:
```js
const someArray = [1, 2, 3, undefined];
someArray.objectsAt([1, 2]); // [2, 3]
```

After:
```js
const someArray = [1, 2, 3, undefined];
[1, 2].map(index => someArray[index]); //[2, 3]
```

#### `reject`

Before:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.reject(el => el.isFruit); // [{ food: 'beans', isFruit: false }]
```

After:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.filter(el => !el.isFruit); // [{ food: 'beans', isFruit: false }]
```
#### `rejectBy`

Before:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.rejectBy('isFruit'); // [{ food: 'beans', isFruit: false }]
```

After:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.filter(el => !el.isFruit); // [{ food: 'beans', isFruit: false }]
```
#### `sortBy`

Before:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.sortBy('food', 'isFruit'); // [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }]
```

After:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
[...someArray].sort((a, b) => {
  return a.food?.localeCompare(b.food)
    ? a.food?.localeCompare(b.food)
    : a.isFruit - b.isFruit;
}); // [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }]
```
#### `toArray`

Before:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
someArray.toArray(); // [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }]
```

After:
```js
const someArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];
[...someArray] // [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }]
```

#### `uniq`

Before:
```js
const someArray = [1, 2, 3, undefined, 3];
someArray.uniq(); // [1, 2, 3, undefined]
```

After:
```js
const someArray = [1, 2, 3, undefined, 3];
[...new Set(someArray)] // [1, 2, 3, undefined]
```

#### `uniqBy`

Before:
```js
const someArray = [{ food: 'apple' }, { food: 'beans' }, { food: 'apple' }];
someArray.uniqBy('food'); // [{ food: 'apple' }, { food: 'beans' }]
```

After:
```js
const someArray = [{ food: 'apple' }, { food: 'beans' }, { food: 'apple' }];
someArray.reduce(
  (unique, item) => {
    if (!unique.find(i => item.food === i.food)) {
      unique.push(item);
    }
    return unique;
  },
  []
); // [{ food: 'apple' }, { food: 'beans' }]
```

You may also instead rely on methods from another library like [lodash](https://lodash.com/).
Keep in mind that different libraries will behave in slightly different ways, so make sure any critical transformations are thoroughly tested.

### Some special cases
#### `without`
Before
```js
const someArray = ['a', 'b', 'c'];
someArray.without('a'); // ['b', 'c']
```

After
```js
const someArray = ['a', 'b', 'c'];
someArray.filter(el => el !== 'a'); // ['b', 'c']
```

Please make sure `without` reactivity is fully tested.

#### `setEach`
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

## Observable Properties
`firstObject`, `lastObject` are observable properties. Changing directly from `firstObject` to `at(0)` or `[0]` might cause issues that the properties are no longer reactive.

### Used in template
If the `firstObject` and `lastObject` are used in a template, you can convert to use `get` helper safely as `get` helper handles the reactivity already.

Before
```handlebars
<Foo @bar={{@list.firstObject.name}} />
```

After
```handlebars
<Foo @bar={{get @list '0.name'}} />
```

You can also leverage fixers provided by [`ember-template-lint/no-array-prototype-extensions`](https://github.com/ember-template-lint/ember-template-lint/blob/master/docs/rule/no-array-prototype-extensions.md).

### Used in js
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

## Mutation methods
Mutation methods are observable-based, which means you should always convert the accessors to `@tracked` or `TrackedArray` in order to maintain the reactivity. This includes following (a list from [`MutableArray` methods](https://api.emberjs.com/ember/4.3/classes/MutableArray)):

#### `addObject`

Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  addObject(value) {
    this.abc.addObject(value);
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  addObject(value) {
    if (!this.abc.includes(value)) {
      this.abc.push(value);
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  addObject(value) {
    if (!this.abc.includes(value)) {
      this.abc = [...this.abc, value];
    }
  }
}
```
#### `addObjects`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  addObjects(value) {
    this.abc.addObjects(value);
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  _addObject(value) {
    if (!this.abc.includes(value)) {
      this.abc.push(value);
    }
  }

  @action
  addObjects(values) {
    values.forEach(v => this._addObject(v))
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  _addObject(value) {
    if (!this.abc.includes(value)) {
      this.abc = [...this.abc, value];
    }
  }

  @action
  addObjects(values) {
    values.forEach(v => this._addObject(v))
  }
}
```

#### `clear`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  clear(value) {
    this.abc.clear();
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  clear(value) {
    this.abc.splice(0, this.abc.length);
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  clear() {
    this.abc = [];
  }
}
```

#### `insertAt`

Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  insertAt(idx, value) {
    this.abc.insertAt(idx, value);
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  insertAt(idx, value) {
    this.abc.splice(idx, 0, value);
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  insertAt(idx, value) {
    this.abc = [...this.abc.slice(0, idx), value, this.abc.slice(this.abc.length - idx)]
  }
}
```

#### `popObject`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  popObject() {
    this.abc.popObject();
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  popObject() {
    this.abc.pop();
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  popObject() {
    this.abc.pop();
    this.abc = [...this.abc];
  }
}
```

#### `pushObject`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  pushObject(value) {
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  pushObject(value) {
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  pushObject(value) {
    this.abc = [...this.abc, value];
  }
}
```

#### `pushObjects`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  pushObjects(values) {
    this.abc.pushObjects(values);
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  pushObjects(values) {
    this.abc.splice(this.abc.length, 0, ...values);
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  pushObjects(values) {
    this.abc = [...this.abc, ...values];
  }
}
```

#### `removeAt`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  removeAt(start, len) {
    this.abc.removeAt(start, len);
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  removeAt(start, len) {
    this.abc.splice(start, len);
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  removeAt(start, len) {
    this.abc.splice(start, len);
    this.abc = [...this.abc];
  }
}
```

#### `removeObject`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  removeObject(value) {
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  removeObject(value) {
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  removeObject(value) {
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

#### `removeObjects`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  removeObjects(values) {
    this.abc.removeObjects(values);
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  _removeObject(value) {
    let loc = this.abc.length || 0;
    while (--loc >= 0) {
      let curValue = this.abc.at(loc);

      if (curValue === value) {
        this.abc.splice(loc, 1);
      }
    }
  }

  @action
  removeObjects(values) {
    values.forEach(v => {
      this._removeObject(v);
    });
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  _removeObject(value) {
    let loc = this.abc.length || 0;
    while (--loc >= 0) {
      let curValue = this.abc.at(loc);

      if (curValue === value) {
        this.abc.splice(loc, 1);
      }
    }
    this.abc = [...this.abc];
  }

  @action
  removeObjects(values) {
    values.forEach(v => {
      this._removeObject(v);
    })
  }
}
```

#### `replace`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  replace(idx, len, values) {
    this.abc.replace(idx, len, values);
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  replace(idx, len, values) {
    this.abc.splice(idx, len, ...values);
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  replace(idx, len, values) {
    this.abc.splice(idx, len, ...values);
    this.abc = [...this.abc];
  }
}
```

#### `reverseObjects`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  reverseObjects() {
    this.abc.reverseObjects();
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  reverseObjects() {
    this.abc.reverse();
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  reverseObjects() {
    this.abc = [...this.abc.reverse()];
  }
}
```

#### `setObjects`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  setObjects(values) {
    this.abc.setObjects(values);
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  setObjects(values) {
    this.abc.splice(0, this.abc.length, ...values);
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  setObjects(values) {
    this.abc = [...values];
  }
}
```

#### `shiftObject`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  shiftObject() {
    this.abc.shiftObject();
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  shiftObject() {
    this.abc.shift();
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  shiftObject() {
    this.abc.shift();
    this.abc = [...this.abc]
  }
}
```

#### `unshiftObject`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  unshiftObject(obj) {
    this.abc.unshiftObject(obj);
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
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  unshiftObject(obj) {
    this.abc.unshift(obj);
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  unshiftObject(obj) {
    this.abc.unshift(obj);
    this.abc = [...this.abc];
  }
}
```

#### `unshiftObjects`
Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  @action
  unshiftObjects(objs) {
    this.abc.unshiftObjects(objs);
  }
```

After
```js
// TrackedArray
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { TrackedArray } from 'tracked-built-ins';

export default class SampleComponent extends Component {
  abc = new TrackedArray(['x', 'y', 'z', 'x']);

  @action
  unshiftObjects(objs) {
    this.abc.unshift(...objs);
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
  @tracked abc = ['x', 'y', 'z', 'x'];

  @action
  unshiftObjects(objs) {
    this.abc.unshift(...objs)
    this.abc = [...this.abc];
  }
}
```


It's always recommended to reference the existing implementation of the method you are trying to convert. This can make sure functionalities are kept as it was. Implementation details can be found in [`MutableArray`](https://api.emberjs.com/ember/release/classes/MutableArray), for example [`removeObject`](https://github.com/emberjs/ember.js/blob/v4.3.0/packages/%40ember/-internals/runtime/lib/mixins/array.js#L1619).



