---
id: ember-component.is-visible
title: Deprecate `Component#isVisible`
until: '4.0.0'
since: '3.15'
---

In ember earlier versions, we had the concept of 'A controller should never call method or change property on its associated view '( Ember.View class)', instead the view should bind the state of its associated controller.'

So, we were using something like this,

```js
import Ember from 'ember';
App.MyView = Ember.View.extend({
  isVisible: Ember.computed.alias('controller.myViewVisible')
}
```

or in the component

```js
import Component from '@ember/component';
import { alias } from '@ember/object/computed';
export default Component.extend({
  isVisible: alias('myViewVisible');
});
```

We are deprecating usage of the `isVisible` in classic components in accordance with [RFC #324](https://github.com/emberjs/rfcs/blob/master/text/0324-deprecate-component-isvisible.md).

Instead of setting the `isVisible` property on classic components, consider either using `{{#if}}` helper like below

```js {data-filename=app/templates/components/my-question.js}
import Component from '@glimmer/component';
import { A } from '@ember/array';
export default class MyQuestion extends Component {
  get students() {
    return A(['john', 'peter']);
  }
}
```

```handlebars {data-filename=app/templates/components/my-question.hbs}
{{! `if` helper }}
{{#if this.students.length}}
  <MyComponent />
{{/if}}
```

or in the HTML element, we can use the [`hidden`] (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) attribute and pass the value dynamically:

```js {data-filename=app/templates/components/my-question.js}
import Component from '@glimmer/component';
export default class MyQuestions extends Component {
  get hideMe() {
    return true;
  }
}
```

```handlebars {data-filename=app/templates/components/my-question.hbs}
{{! `hidden` attribute }}
<div hidden={{this.hideMe}}></div>
```