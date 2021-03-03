---
id: route-disconnect-outlet
title: Deprecate `Route#disconnectOutlet`
until: '4.0.0'
since: 'Upcoming Features'
---

`Route#disconnectOutlet` is intended to be used in conjunction with `Route#render`. As `render` is deprecated and `disconnectOutlet` is primarily used to teardown named outlets setup by `render`, it is also deprecated. See [RFC #491](https://emberjs.github.io/rfcs/0491-deprecate-disconnect-outlet.html).

The migration path is the [same as the one](https://deprecations.emberjs.com/v3.x#toc_route-render-template) defined for `Route#render` where components should be used instead of named outlets. A developer should wrap the component in a conditional if they want to control its destruction.

Given:

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