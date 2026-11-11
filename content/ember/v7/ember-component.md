---
title: 'Classic Component from @ember/component'
until: 8.0.0
since: 7.6.0
---

The default export of `@ember/component`, the classic `Component` class, is deprecated. Use a Glimmer component from `@glimmer/component`, or a template-only component.

Ember reports the deprecation when your app creates an instance of a classic component.

Classic and Glimmer components work together in the same app and in the same template. You can migrate one component at a time, in any order. Start with the components that do not render other classic components.

The references at the end of this page have more before and after examples.

### A component with no class

If the class is empty, delete it. A template is a component.

Before:

```js
// app/components/greeting.js
import Component from '@ember/component';

export default class Greeting extends Component {}
```

```handlebars
{{! app/components/greeting.hbs }}
<p>Hello, {{@name}}!</p>
```

After:

```gjs
// app/components/greeting.gjs
<template>
  <p>Hello, {{@name}}!</p>
</template>
```

### Arguments

A Glimmer component reads its arguments from `this.args`, or from `@name` in the template. Arguments are read-only.

Before:

```js
import Component from '@ember/component';

export default class Profile extends Component {
  get title() {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

After:

```gjs
import Component from '@glimmer/component';

export default class Profile extends Component {
  get title() {
    return `${this.args.firstName} ${this.args.lastName}`;
  }

  <template>
    <h2>{{this.title}}</h2>
  </template>
}
```

A getter updates automatically when the arguments change. Replace `didReceiveAttrs` code that derives values from arguments with getters. If a getter is expensive, add `@cached` from `@glimmer/tracking`.

### Local state

Replace `this.set` with an assignment to a `@tracked` property. Replace `init` with `constructor`.

Before:

```js
import Component from '@ember/component';
import { action } from '@ember/object';

export default class Toggle extends Component {
  isOn = false;

  @action
  flip() {
    this.set('isOn', !this.isOn);
  }
}
```

After:

```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

export default class Toggle extends Component {
  @tracked isOn = false;

  flip = () => {
    this.isOn = !this.isOn;
  };

  <template>
    <button type="button" {{on "click" this.flip}}>
      {{if this.isOn "on" "off"}}
    </button>
  </template>
}
```

### The wrapper element

A Glimmer component has no wrapper element. Write the element in the template. Move `tagName`, `classNames`, `classNameBindings`, `attributeBindings`, `elementId` and `ariaRole` onto it as attributes.

Before:

```js
import Component from '@ember/component';

export default class UserCard extends Component {
  tagName = 'section';
  classNames = ['user-card'];
  classNameBindings = ['isSelected:selected'];
  attributeBindings = ['label:aria-label'];
  ariaRole = 'listitem';
}
```

```handlebars
<img src={{this.user.avatar}} alt="" />
{{yield}}
```

After:

```gjs
<template>
  <section
    class="user-card {{if @isSelected 'selected'}}"
    role="listitem"
    aria-label={{@label}}
    ...attributes
  >
    <img src={{@user.avatar}} alt="" />
    {{yield}}
  </section>
</template>
```

`...attributes` puts the attributes from the call site, such as `class` and `data-*`, on that element.

### Event methods

Replace methods such as `click()`, `keyDown()` and `mouseEnter()` with the `on` modifier. Use the DOM event name: `"click"`, `"keydown"`, `"mouseenter"`.

Before:

```js
import Component from '@ember/component';

export default class Item extends Component {
  click(event) {
    this.select(event);
  }
}
```

After:

```gjs
import { on } from '@ember/modifier';

<template>
  <div {{on "click" @select}} ...attributes>
    {{yield}}
  </div>
</template>
```

### Lifecycle hooks and `this.element`

Code in `didInsertElement`, `didRender`, `didUpdateAttrs` or `willDestroyElement` that uses the DOM goes into a modifier on the element. The guide [Template Lifecycle, DOM, and Modifiers](https://guides.emberjs.com/release/components/template-lifecycle-dom-and-modifiers/) shows how to write one.

For teardown that does not use the DOM, use `willDestroy` in a Glimmer component, or `registerDestructor` from `@ember/destroyable`.

### Two-way bindings

A classic component can `this.set` a property that the parent passed in, and the parent sees the change. Arguments of a Glimmer component are read-only. The parent keeps the state and passes a function that changes it.

Before:

```js
import Component from '@ember/component';
import { action } from '@ember/object';

export default class Counter extends Component {
  @action
  increment() {
    this.set('count', this.count + 1);
  }
}
```

After:

```gjs
// app/components/counter.gjs
import { on } from '@ember/modifier';

<template>
  <button type="button" {{on "click" @onIncrement}}>
    {{@count}}
  </button>
</template>
```

```gjs
// app/components/parent.gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Counter from './counter';

export default class Parent extends Component {
  @tracked count = 0;

  increment = () => {
    this.count++;
  };

  <template>
    <Counter @count={{this.count}} @onIncrement={{this.increment}} />
  </template>
}
```

### `positionalParams`

Glimmer components do not take positional arguments. Use named arguments at each call site.

Before:

```handlebars
{{avatar this.user this.size}}
```

After:

```handlebars
<Avatar @user={{this.user}} @size={{this.size}} />
```

### References

- [Migrating to Octane](https://guides.emberjs.com/v5.12.0/upgrading/current-edition/), the step by step upgrade guide:
  - [Native Classes](https://guides.emberjs.com/v5.12.0/upgrading/current-edition/native-classes/)
  - [Tracked Properties](https://guides.emberjs.com/v5.12.0/upgrading/current-edition/tracked-properties/)
  - [`@action`, `{{on}}` and `{{fn}}`](https://guides.emberjs.com/v5.12.0/upgrading/current-edition/action-on-and-fn/)
  - [Glimmer Components](https://guides.emberjs.com/v5.12.0/upgrading/current-edition/glimmer-components/)
- [Octane vs Classic cheat sheet](https://ember-learn.github.io/ember-octane-vs-classic-cheat-sheet/)
- [Template Lifecycle, DOM, and Modifiers](https://guides.emberjs.com/release/components/template-lifecycle-dom-and-modifiers/)
- [Template Tag Format](https://guides.emberjs.com/release/components/template-tag-format/)
- [RFC 1216](https://rfcs.emberjs.com/id/1216-deprecate-ember-component), which deprecates the classic component
