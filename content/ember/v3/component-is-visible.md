---
id: ember-component.is-visible
title: Deprecate `Component#isVisible`
until: '4.0.0'
since: '3.15'
---

Classic components have a number of APIs to handle the wrapper `div` that they create by default.
One of them is `isVisible`, which controls if the component is hidden to the end user or not.
`isVisible` is now deprecated in accordance with [RFC #324](https://github.com/emberjs/rfcs/blob/master/text/0324-deprecate-component-isvisible.md).

You can update your component in one of two ways, you can wrap your component's template in an `{{if}}`, or you can use the [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) HTML attribute.

It's worth noting that not all visibility approaches are equal- we recommend reviewing use of `aria-hidden` as well as accessible ways to visibly hide content while still making it available to assistive technology. 

Because classic components have a wrapper `div` element by default,
it might be necessary that you do additional changes to your component so that no content is accidentally shown.

Let's say you have a flash message component that hides itself when you dismiss it:

```js {data-filename=app/components/flash-message.js}
import Component from '@ember/component';

export default Component.extend({
  isVisible: true,

  dismissMessage() {
    this.set('isVisible', false);
  }
});
```

```handlebars {data-filename=app/components/flash-message.hbs}
<p>You received a message: "{{@message}}"</p>

<button type="button" {{action 'dismissMessage'}}>Dismiss</button>
```

#### Wrapping template in an `{{if}}`

Fist, let's use a different property to keep track of visibility.
I decided to call it `shouldShow`, as that name has no meaning to the classic component class:

```js {data-filename=app/components/flash-message.js}
import Component from '@ember/component';

export default Component.extend({
  shouldHide: false,

  dismissMessage() {
    this.set('shouldShow', false);
  }
});
```

Now we wrap the template in a conditional:

```handlebars {data-filename=app/components/flash-message.hbs}
{{#if}}
  <p>You received a message: "{{@message}}"</p>

  <button type="button" {{action 'dismissMessage'}}>Dismiss</button>
{{{/if}}}
```

As mentioned this has the drawback of still rendering the wrapping `div`, so next we'll see how we can use that to our advantage!

#### Using the hidden HTML attribute

There is an HTML attribute that you can use whenever you want an element to now show to the end user, the `hidden` attribute.
To update our `FlashMessage` component to use it, we need to use the `attributeBindings` API.

To avoid confusing about the state of the component, we will use the `shouldHide` name for the property that holds the state,
and flip the values:

```js {data-filename=app/components/flash-message.js}
import Component from '@ember/component';

export default Component.extend({
  attributeBindings: ['shouldHide:hidden'],
  shouldHide: false,

  dismissMessage() {
    this.set('shouldHide', true);
  }
});
```

The template remains the same in this case:

```handlebars {data-filename=app/components/flash-message.hbs}
<p>You received a message: "{{@message}}"</p>

<button type="button" {{action 'dismissMessage'}}>Dismiss</button>
```

#### Using a Glimmer component

If you are looking to upgrade straight to a Glimmer component, which doesn't have a wrapper `div`,
you need to do something slightly different.

First, let's update the class:

```js {data-filename=app/components/flash-message.js}
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FlashMessageComponent extends Component {
  @tracked shouldHide = false,

  @action
  dismissMessage() {
    this.shouldHide = true;
  }
}
```

And now let's tweak the template:

```handlebars {data-filename=app/components/flash-message.hbs}
<div hidden={{this.shouldHide}}>
  <p>You received a message: "{{@message}}"</p>

  <button type="button" {{on 'click' this.dismissMessage}}>Dismiss</button>
</div>
```

As you can see, we added a wrapper `div` so we could use the `hidden` HTML attribute.
We also switched from using `{{action}}` to using `{{on}}`.
