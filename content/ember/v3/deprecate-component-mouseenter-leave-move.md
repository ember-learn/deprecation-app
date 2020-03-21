---
id: component.mouseenter-leave-move
title: Deprecate mouseEnter/Leave/Move component methods
until: '4.0.0'
since: '3.13'
---

As `mouseenter`, `mouseleave` and `mousemove` events fire very frequently, are rarely used and have a higher
implementation cost, support for them in Ember's `EventDispatcher` has been deprecated. As such the corresponding
event handler methods in `Ember.Component` should not be used anymore.

Before:

```js
import Component from '@ember/component';

export default class MyComponent extends Component {
  mouseEnter(e) {
    // do something
  }
}
```

After:

```js
import Component from '@ember/component';
import { action } from '@ember/object';

export default class MyComponent extends Component {
  @action
  handleMouseEnter(e) {
    // do something
  }
  
  didInsertElement() {
    super.didInsertElement(...arguments);
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
  }
  
  willDestroyElement() {
    super.willDestroyElement(...arguments);
    this.element.removeEventListener('mouseenter', this.handleMouseEnter);
  }
}
```

An alternative to attaching the event listener in the component class is to opt into outer HTML semantics by making the
component tag-less and using the `{{on}}` modifier in the template:

```js
import Component from '@ember/component';
import { action } from '@ember/object';

export default class MyComponent extends Component {
  tagName = '';
  
  @action
  handleMouseEnter(e) {
    // do something
  }
}
```

```handlebars
<div {{on "mouseenter" this.handleMouseEnter}}>
  ...
</div>
```
