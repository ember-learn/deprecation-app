until: '4.0.0'
since: '3.15'
---
In ember earlier versions, we had the concept of 'A controller should never call method or change property on its associated view '( Ember.View class)', instead the view should bind the state of its associated controller.'

So, we were using something like this,
```js
App.MyView = Ember.View.extend({
  isVisible: Ember.computed.alias('controller.myViewVisible')
}
```

or in the component

```js
  isVisible: Ember.computed.alias('myViewVisible')
```

We are deprecating usage of the `isVisible` in classic components in accordance with [RFC #324](https://github.com/emberjs/rfcs/blob/master/text/0324-deprecate-component-isvisible.md).

Instead of setting the `isVisible` property on classic components, consider either using `{{#if}}` helper like below

```js
  {{! app/templates/components/my-question.js }}
    get students() {
      return A(['john', 'peter']);
    }
```
{{! app/templates/components/my-question.hbs }}
{{! `if` helper }}
{{#if this.students.length}}
  <MyComponent />
{{/if}}
```
or in the html element, we can use [`hidden`] (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) attribute and pass the value dynamically:

``js
  {{! app/templates/components/my-question.js }}
  get hideMe() {
    return true;
  }
```

```hbs
  {{! app/templates/components/my-question.hbs }}
  {{! `hidden` attribute }}
  <div hidden={{this.hideMe}}></div>
```
