---
id: modifying-a-property-within-code-didinsertelement-code
title: Modifying a Property within didInsertElement
until: ''
since: '1.13'
---

Because of changes in the way Ember renders components in 1.13, setting properties within an overridden `didInsertElement` method
will result in a deprecation warning.

In many cases you can move your logic earlier in the component lifecycle by implementing the `didReceiveAttrs` hook, one of
[the new hooks introduced in 1.13](http://emberjs.com/blog/2015/06/12/ember-1-13-0-released.html#toc_component-lifecycle-hooks).

```javascript
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('myValue', value);
  }
```

It may even be possible, if your value is constant, to move the change to `init`, where the value can only be set once.

```javascript
  init() {
    this._super(...arguments);
    this.set('myValue', myValue);
  }
```

Don't see a `set` in your `didInsertElement`? It may be in `didUpdate` or `didRender`. Due to a bug, these report the wrong method name.

Still can't find it?
- One of your computed properties may be calling `set`.
- An observer is being triggered.
- One of your child components may be setting one of its attributes and it is being propagated upward to this component.

In rare cases, you may be measuring the DOM rendered and want to set an attribute based on that. In this case, it is ok to cause a second render:

```javascript
  didInsertElement() {
    this._super(...arguments);
    run.schedule('afterRender', this, this.measureAndSet);
  },

  measureAndSet() {
    this.set('height', this.element.children.length * 30);
  }
```

However, doing so is relatively slow and should be done as a last resort.
