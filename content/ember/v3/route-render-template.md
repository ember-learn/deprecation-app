---
id: route-render-template
title: Deprecate `Route#renderTemplate`
until: '4.0.0'
since: 'Upcoming Features'
---

The `Route#render` and `Route#renderTemplate` APIs have been deprecated. These APIs are largely holdovers from a time where components where not as prominent in your typical Ember application and are no longer relevant. See [RFC #418](https://emberjs.github.io/rfcs/0418-deprecate-route-render-methods.html).

The migration plan here is going to be somewhat situational based on the UI that was being constructed. For cases where named outlets were being used it is likely that they should just be moved to components. For cases where you were escaping the existing DOM hierarchy to render a template somewhere else in the DOM, one should use the built-in [`{{in-element}}`](https://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/in-element?anchor=in-element) helper or an addon like [ember-wormhole](https://github.com/yapplabs/ember-wormhole). Below are some example of how a migration would look.

__Migrating Named Outlets__

Given:

```js
// app/routes/checkout.js
class CheckoutRoute extends Route {
  // ...
  renderTemplate() {
    this.render('cart', {
      into: 'checkout',
      outlet: 'cart',
      controller: 'cart'
    })
  }
}
```

```hbs
{{! checkout.hbs}}
<section id="items">
  {{outlet}}
</section>
<aside>
  {{outlet "cart"}}
</aside>
```

This would tell Ember to render `cart.hbs` into `checkout.hbs` at the `{{outlet "cart"}}` and use the `cart` controller to back the `cart.hbs` template.

We can migrate this entirely to use components.

```hbs
{{! checkout.hbs}}
<section id="items">
  {{outlet}}
</section>
<aside>
  <Cart />
</aside>
```

__Migrating Hiearchy Escaping__

```js
// app/routes/checkout.js
class CheckoutRoute extends Route {
  // ...

  @action
  showModal() {
    this.render('modal', {
      outlet: 'modal',
      into: 'application'
    });
  }

  @action
  hideModal() {
    this.disconnectOutlet('modal');
  }
}
```

```hbs
{{! app/templates/checkout.hbs}}
<button {{on "click" this.showModal}}>Show Modal</button>
<button {{on "click" this.closeModal}}>Close Modal</button>
```

```hbs
{{! app/templates/application.hbs}}
{{outlet "modal"}}

<main>
  {{outlet}}
</main>
```

This can transitioned to:

```js
// app/controller/checkout.js
class CheckoutController extends Controller {
  // ...
  @tracked isModalOpen = false;

  init() {
    super.init();
    this.modalElement = document.getElementById('modal');
  }

  @action
  showModal() {
    this.isModalOpen = true;
  }

  @action
  closeModal() {
    this.isModalOpen = false;
  }
}
```

```hbs
{{! app/templates/checkout.hbs}}
<button {{on "click" this.showModal}}>Show Modal</button>
<button {{on "click" this.closeModal}}>Close Modal</button>

{{#if this.isModalOpen}}
  {{#in-element this.modalElement}}
    <Modal />
  {{/in-element}}
{{/if}}
```

```hbs
{{! app/templates/application.hbs}}
<div id="modal"></div>

<main>
  {{outlet}}
</main>
```

The above example will conditionally append the modal component into `div#modal` whenever the user toggles the modal.