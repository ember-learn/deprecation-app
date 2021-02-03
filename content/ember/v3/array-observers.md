---
id: array-observers
title: Array Observers
until: '4.0.0'
since: 'Upcoming Features'
---

Array observers are a special type of observer that can be used to synchronously
react to changes in an `EmberArray`. In general, to refactor away from them, these
reactions need to be converted from _eager_, _synchronous_ reactions into _lazy_
reactions that occur when the array in question is _used or accessed_.

For example, let's say that we had a class which wrapped an `EmberArray` and
converted its contents into strings by calling `toString()` on them. This class
could be implemented using array observers like so:

```js
class ToStringArray {
  constructor(innerArray) {
    this._inner = innerArray;

    this._content = innerArray.map((value) => value.toString());

    innerArray.addArrayObserver(this, {
      willChange: '_innerWillChange',
      didChange: '_innerDidChange',
    });
  }

  // no-op
  _innerWillChange() {}


  _innerDidChange(innerArray, changeStart, removeCount, addCount) {
    if (removeCount) {
      // if items were removed, remove them
      this._content.removeAt(changeStart, removeCount);
    } else {
      // else, find the new items, convert them, and add them to the array
      let newItems = innerArray.slice(changeStart, addCount);

      this._content.replace(changeStart, 0, newItems.map((value) => value.toString()));
    }

    // Let observers/computeds know that the value has changed
    notifyPropertyChange(this, '[]');
  }

  objectAt(index) {
    return this._content.objectAt(index);
  }
}
```

To convert this to no longer use array observers, we could instead convert the
wrapping to happen when the array is accessed in `objectAt`, using the `@cached`
decorator from [tracked-toolbox](https://github.com/pzuraq/tracked-toolbox).

```js
import { cached } from 'tracked-toolbox';

class ToStringArray {
  constructor(innerArray) {
    this._inner = innerArray;
  }

  @cached
  get _content() {
    return this._inner.map((value) => value.toString());
  }

  objectAt(index) {
    return this._content.objectAt(index);
  }
}
```

This can also be accomplished with native [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy),
allowing your users to interact with the array using standard array syntax
instead of `objectAt`:

```js
class ToStringArrayHandler {
  constructor(innerArray) {
    this._inner = innerArray;
  }

  @cached
  get _content() {
    return this._inner.map((value) => value.toString());
  }

  get(target, prop) {
    return this._content.objectAt(prop);
  }
}

function createToStringArray(innerArray) {
  return new Proxy([], new ToStringArrayHandler(innerArray));
}
```

This solution will work with autotracking in general, since users who access the
array via `objectAt` will be accessing the tracked property. However, it will
not integrate with computed property dependencies. If that is needed, then you
can instead extend Ember's built-in `ArrayProxy` class, which handles forwarding
events and dependencies itself.

```js
import ArrayProxy from '@ember/array/proxy';
import { cached } from 'tracked-toolbox';

class ToStringArray extends ArrayProxy {
  @cached
  get _content() {
    return this.content.map((value) => value.toString());
  }

  objectAtContent(index) {
    return this._content.objectAt(index);
  }
}
```

#### Converting code that watches arrays for changes

Array observers and change events can be used to watch arrays and react to
changes in other ways as well. For instance, you may have a component like
`ember-collection` which used array observers to trigger a rerender and
rearrange its own representation of the array. A simplified version of this
logic looks like the following:

```js
export default Component.extend({
  layout: layout,

  init() {
    this._cells = A();
  },

  _needsRevalidate(){
    if (this.isDestroyed || this.isDestroying) {return;}
    this.rerender();
  },

  didReceiveAttrs() {
    this._super();

    this.updateItems();
  },

  updateItems(){
    var rawItems = this.get('items');

    if (this._rawItems !== rawItems) {
      if (this._items && this._items.removeArrayObserver) {
        this._items.removeArrayObserver(this, {
          willChange: noop,
          didChange: '_needsRevalidate'
        });
      }
      this._rawItems = rawItems;
      var items = A(rawItems);
      this.set('_items', items);

      if (items && items.addArrayObserver) {
        items.addArrayObserver(this, {
          willChange: noop,
          didChange: '_needsRevalidate'
        });
      }
    }
  },

  willRender() {
    this.updateCells();
  },

  updateCells() {
    // ...
  },

  actions: {
    scrollChange(scrollLeft, scrollTop) {
      // ...
      if (scrollLeft !== this._scrollLeft ||
          scrollTop !== this._scrollTop) {
        set(this, '_scrollLeft', scrollLeft);
        set(this, '_scrollTop', scrollTop);
        this._needsRevalidate();
      }
    },
    clientSizeChange(clientWidth, clientHeight) {
      if (this._clientWidth !== clientWidth ||
          this._clientHeight !== clientHeight) {
        set(this, '_clientWidth', clientWidth);
        set(this, '_clientHeight', clientHeight);
        this._needsRevalidate();
      }
    }
  }
});
```

We can refactor this to update the cells themselves when they are accessed, by
accessing them into a computed property that depends on the items array, and
which updates the cells when it is accessed:

```js
export default Component.extend({
  layout: layout,

  init() {
    this._cells = A();
  },

  cells: computed('items.[]', function() {
    this.updateCells();

    return this._cells;
  })

  updateCells() {
    // ...
  },

  actions: {
    scrollChange(scrollLeft, scrollTop) {
      // ...
      if (scrollLeft !== this._scrollLeft ||
          scrollTop !== this._scrollTop) {
        set(this, '_scrollLeft', scrollLeft);
        set(this, '_scrollTop', scrollTop);
        this.notifyPropertyChange('cells');
      }
    },
    clientSizeChange(clientWidth, clientHeight) {
      if (this._clientWidth !== clientWidth ||
          this._clientHeight !== clientHeight) {
        set(this, '_clientWidth', clientWidth);
        set(this, '_clientHeight', clientHeight);
        this.notifyPropertyChange('cells');
      }
    }
  }
});
```

Mutating untracked local state like this is generally ok as long as the state is
essentially a cached representation of computed or getter is deriving in
general. It allows you to do things like compare the previous state to the
current state during the update, and cache portions of the computation so that
you do not need to redo all of it.

It is also possible that you have some code which must run whenever the array
has changed, and must run eagerly. For instance, the array fragment from
`ember-data-model-fragments` has some logic for signalling to the parent record
that it has changed, which looks like this (simplified):

```js
const StatefulArray = ArrayProxy.extend(Copyable, {
  content: computed(function() {
    return A();
  }),

  // ...

  arrayContentDidChange() {
    this._super(...arguments);

    let record = get(this, 'owner');
    let key = get(this, 'name');

    // Any change to the size of the fragment array means a potential state change
    if (get(this, 'hasDirtyAttributes')) {
      fragmentDidDirty(record, key, this);
    } else {
      fragmentDidReset(record, key);
    }
  },
});
```

Ideally the dirty state would be converted into derived state that could read
the array it was dependent upon, but if that's not an option or would require
major refactors, it is also possible to override the mutator method of the array
and trigger the change when it is called. In EmberArray's, the primary mutator
method is the `replace()` method.

```js
const StatefulArray = ArrayProxy.extend(Copyable, {
  content: computed(function() {
    return A();
  }),

  // ...

  replace() {
    this._super(...arguments);

    let record = get(this, 'owner');
    let key = get(this, 'name');

    // Any change to the size of the fragment array means a potential state change
    if (get(this, 'hasDirtyAttributes')) {
      fragmentDidDirty(record, key, this);
    } else {
      fragmentDidReset(record, key);
    }
  },
});
```

Note that this method will work for arrays and array proxies that are mutated
directly, but will not work for array proxies which wrap other arrays and watch
changes on them. In those cases, the recommendation is to refactor such that:

1. Changes are always intercepted by the proxy, and can call the code
   synchronously when they occur.
2. The change logic is added by intercepting changes on the original array, so
   it will occur whenever it changes.
3. The API that must be called synchronously is instead driven by derived state.
   For instance, in the example above, the record's dirty state could be driven
   by the various child fragments it contains, and updated whenever the user
   accesses it, rather than by sending events such as `didDirty` and `didReset`.

#### Converting code that uses the `willChange` functionality

In general, it is no longer possible to react to an array change before it
occurs except by overriding the mutation methods on the array itself. You can do
this by replacing them and calling your logic _before_ calling `super`.

```js
const ArrayWithWillChange = EmberObject.extend(MutableArray, {
  replace() {
    // Your logic here

    this._super(...arguments);
  },
});
```

In cases where this is not possible, you can instead convert to derived state,
and cache the previous value of the array to compare it the next time the state
is accessed.
