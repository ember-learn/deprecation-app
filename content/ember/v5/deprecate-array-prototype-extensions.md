---
id: deprecate-array-prototype-extensions
title: "Deprecate array prototype extensions"
until: '6.0.0'
since: '5.0.0'
---

Ember historically extended the prototypes of native Javascript arrays to implement `Ember.Enumerable`, `Ember.MutableEnumerable`, `Ember.MutableArray`, `Ember.Array`. As of v5, the usages of array prototype extensions are deprecated.

For convenient functions like `filterBy`, `compact`, you can directly use native array method instead.

For mutation functions (like `pushObject`, `replace`) or observable properties (`firstObject`, `lastObject`), in order to keep the reactive behavior, you should take following steps:
* 1. convert the array either to a new `@tracked` property, or use `TrackedArray` from `tracked-built-ins`;
* 2. convert the function to use array native methods;
* 3. fully test to make sure the reactivity is maintained.

### Convenient Functions
Before:

```js
const simpleArray = [1, 2, 3, undefined];
const complexArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];

simpleArray.any(value => value === 1);  // true
simpleArray.compact(); // [1, 2, 3]
complexArray.filterBy('food', 'beans'); // [{ food: 'beans', isFruit: false }]
complexArray.findBy('isFruit'); // { food: 'apple', isFruit: true }
complexArray.getEach('food'); // ['apple', 'beans']
complexArray.isAny('isFruit'); // true
complexArray.isEvery('isFruit'); // false
// To be added:
// invoke
// mapBy
// objectAt
// objectsAt
// reject
// rejectBy
// sortBy
// toArray
// uniq
// uniqBy
```

// setEach
// without

After:

```js
import { get } from '@ember/object';
const simpleArray = [1, 2, 3, undefined];
const complexArray = [{ food: 'apple', isFruit: true }, { food: 'beans', isFruit: false }];

simpleArray.some(value => value === 1);  // true
simpleArray.filter(value => value !== null && value !== undefined);; // [1, 2, 3]
complexArray.filter(el => get(el, 'food') === 'beans'); // [{ food: 'beans', isFruit: false }]
complexArray.find(el => get(el, 'isFruit')); // { food: 'apple', isFruit: true }
complexArray.map(el => get(el, 'food')); // ['apple', 'beans']
complexArray.any(el => el.isFruit); // true
complexArray.every(el => el.isFruit); // false
// To be added:
// invoke
// mapBy
// objectAt
// objectsAt
// reject
// rejectBy
// sortBy
// toArray
// uniq
// uniqBy
```

You may also instead rely on methods from another library like [lodash](https://lodash.com/).
Keep in mind that different libraries will behave in slightly different ways, so make sure any critical `Array` transformations are thoroughly tested.

### Observable Properties
`firstObject`, `lastObject` are observable properties. Changing directly from `firstObject` to `at(0)` or `[0]` might cause issues that the properties are no longer reactive.

If the `firstObject` and `lastObject` are used in a template, you can convert to use `get` helper. This is safe as `get` helper handles the reactivity:

Before
```hbs
<Foo @bar={{@list.firstObject.name}} />
```

After
```hbs
<Foo @bar={{get @list '0.name'}} />
```

You can also use fixer provided by [`ember-template-lint/no-array-prototype-extensions`](https://github.com/ember-template-lint/ember-template-lint/blob/master/docs/rule/no-array-prototype-extensions.md).

If the `firstObject` and `lastObject` are used in js files and you used them in an observable way, you will need to convert the array to `@tracked` or `TrackedArray`.

Before
```js
import Component from '@glimmer/component';
export default class SampleComponent extends Component {
  abc = ['x', 'y', 'z', 'x'];

  // lastObject will change when abc.pushObject is executed
  get lastObj() {
    return abc.lastObject;
  }

  @action
  someAction(value) {
    abc.pushObject(value);
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
    return abc.at(-1);
  }

  @action
  someAction(value) {
    abc.push(value);
  }
}
```

```js
// @tracked
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SampleComponent extends Component {
  @tracked abc = [];

  get lastObj() {
    return abc.at(-1);
  }

  @action
  someAction(value) {
    abc = [...abc, value];
  }
}
```

### Mutation methods
Mutation methods are observable-based, which means you should always convert the array to `@tracked` or `TrackedArray` in order to keep the reactivity. This includes following (a list from [`MutableArray` methods](https://api.emberjs.com/ember/4.3/classes/MutableArray)):

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
    abc.pushObject(value);
  }

  @action
  removeAction(value) {
    abc.removeObject(value);
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
    abc.push(value);
  }

  @action
  removeAction(value) {
    let loc = abc.length || 0;
    while (--loc >= 0) {
      let curValue = abc.at(loc);

      if (curValue === value) {
        abc.splice(loc, 1);
      }
    }
  }
}
```

```js
// @tracked
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SampleComponent extends Component {
  @tracked abc = [];

  @action
  pushAction(value) {
    abc = [...abc, value];
  }

  @action
  removeAction(value) {
    let loc = abc.length || 0;
    while (--loc >= 0) {
      let curValue = abc.at(loc);

      if (curValue === value) {
        abc.splice(loc, 1);
      }
    }
    abc = [...abc];
  }
}
```

It's always recommended to reference the existing implementation of the method you are trying to convert. This can make sure functionalities are kept as it was. Implementation details can be found in [`MutableArray`](https://api.emberjs.com/ember/release/classes/MutableArray), for example [`removeObject`](https://github.com/emberjs/ember.js/blob/v4.3.0/packages/%40ember/-internals/runtime/lib/mixins/array.js#L1619).



