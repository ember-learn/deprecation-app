---
title: 'Array computed macros'
until: 8.0.0
since: 7.5.0
---

The array macros from `@ember/object/computed` are deprecated:

```text
collect, filter, filterBy, intersect, map, mapBy, max, min,
setDiff, sort, sum, union, uniq, uniqBy
```

Each macro has an equivalent in native JavaScript. Replace the macro with a getter that uses native array methods. A getter updates automatically when it reads `@tracked` properties or a `trackedArray`.

### Before

```javascript
import { tracked } from '@glimmer/tracking';
import { filterBy, mapBy, sum } from '@ember/object/computed';

class Cart {
  @tracked items = [];

  @filterBy('items', 'inStock', true) available;
  @mapBy('available', 'price') prices;
  @sum('prices') total;
}
```

### After

```javascript
import { trackedArray } from '@ember/reactive/collections';

class Cart {
  items = trackedArray([]);

  get available() {
    return this.items.filter((item) => item.inStock === true);
  }

  get prices() {
    return this.available.map((item) => item.price);
  }

  get total() {
    return this.prices.reduce((sum, price) => sum + price, 0);
  }
}
```

### The equivalent of each macro

In these examples, `list`, `a` and `b` are arrays on the same object.

```javascript
// @map('list', callback)
this.list.map(callback);

// @mapBy('list', 'name')
this.list.map((item) => item.name);

// @filter('list', callback)
this.list.filter(callback);

// @filterBy('list', 'done')
this.list.filter((item) => item.done);

// @filterBy('list', 'state', 'open')
this.list.filter((item) => item.state === 'open');

// @sum('list')
this.list.reduce((sum, value) => sum + value, 0);

// @max('list')
this.list.reduce((max, value) => Math.max(max, value), -Infinity);

// @min('list')
this.list.reduce((min, value) => Math.min(min, value), Infinity);

// @uniq('list')
Array.from(new Set(this.list));

// @union('a', 'b')
Array.from(new Set(this.a.concat(this.b)));

// @uniqBy('list', 'id')
let seen = new Set();
this.list.filter((item) => {
  if (seen.has(item.id)) return false;
  seen.add(item.id);
  return true;
});

// @intersect('a', 'b')
this.a.filter((item) => this.b.includes(item));

// @setDiff('a', 'b')
this.a.filter((item) => !this.b.includes(item));

// @collect('first', 'second')
[this.first ?? null, this.second ?? null];

// @sort('list', (x, y) => x.price - y.price)
this.list.toSorted((x, y) => x.price - y.price);
```

### `sort` with sort properties

`sort` also accepts the key of a list of sort properties, for example `['priority:desc', 'name']`. Write a comparator function instead:

```javascript
// Before
import { sort } from '@ember/object/computed';

class TodoList {
  sorting = ['priority:desc', 'name'];

  @sort('todos', 'sorting') sorted;
}
```

```javascript
// After
class TodoList {
  get sorted() {
    return this.todos.toSorted(
      (x, y) => y.priority - x.priority || x.name.localeCompare(y.name)
    );
  }
}
```

### The result is a native array

Each macro returns an Ember array, which has methods such as `pushObject` and `firstObject`. A getter returns a native array. If other code calls Ember array methods on the result, replace those calls also. Refer to the [`A()`](/id/deprecate-ember-array-a) guide.

For more background, read [RFC 1114](https://github.com/emberjs/rfcs/pull/1114).
