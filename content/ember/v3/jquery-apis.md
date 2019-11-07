---
id: jquery-apis
title: Replace jQuery APIs
until: '4.0.0'
since: '3.9'
---

As of Ember 3.4.0, Ember no longer requires that all applications include jQuery, therefore APIs that are coupled to jQuery have been deprecated.

Since jQuery is not needed by Ember itself anymore, and many apps (e.g. mobile apps) are 
sensitive about performance, it is often beneficial for those to
avoid shipping jQuery. If this is not a major concern for your app, and you see value in using jQuery, it is 
absolutely fine to continue doing so. It is just not included by default anymore, so you have to opt in to
using it with the `@ember/jquery` package as described below.

For addons it is a bit different as they are not aware of the context in which they are used. Any addon that still 
relies on jQuery will either force their consuming apps to continue bundling jQuery, or will not be usable for apps
that decide not to do so. Therefore it is highly recommended to avoid relying on jQuery in general, unless there is a good
reason (e.g. an addon wrapping a jQuery plugin).

#### Added deprecations

The main jQuery integration API that has been deprecated is `this.$()` inside of an `Ember.Component`, which would give you a 
jQuery object of the component's element. Instead, you can use the `this.element` property, which provides a 
reference to a native DOM element:

```js
import Component from '@ember/component';

export default Component.extend({
  waitForAnimation() {
    this.$().on('transitionend', () => this.doSomething());
  }
});
```

should be changed to:

```js
import Component from '@ember/component';

export default Component.extend({
  waitForAnimation() {
    this.element.addEventListener('transitionend', () => this.doSomething());
  }
});
```

If you used `this.$()` to query for child elements, you can do so as well with native DOM APIs:

```js
import Component from '@ember/component';

export default Component.extend({
  waitForAnimation() {
    this.$('.animated').on('transitionend', () => this.doSomething());
  }
});
```

should be changed to:

```js
import Component from '@ember/component';

export default Component.extend({
  waitForAnimation() {
    this.element.querySelectorAll('.animated')
      .forEach((el) => el.addEventListener('transitionend', () => this.doSomething()));
  }
});
```

This applies in a similar fashion to component tests using the `setupRenderingTest()` helper. Instead of using 
`this.$()` in a test, you should use `this.element` (or alternatively the `find()`/`findAll()` helpers from 
`@ember/test-helpers`):

```js
test('it disables the button', async function(assert) {
  // ...
  
  assert.ok(this.$('button').prop('disabled'), 'Button is disabled');
});
```

should be changed to:

```js
test('it disables the button', async function(assert) {
  // ...
  
  assert.ok(this.element.querySelector('button').disabled, 'Button is disabled');
});
```


If you do continue to use jQuery, please make sure to always import it like this:

```js
import jQuery from 'jquery';
```

Accessing it from the `Ember` namespace as `Ember.$` is and will remain deprecated.

#### Opting into jQuery

Apps and addons which require jQuery, can opt into the jQuery integration now provided by
the `@ember/jquery` package. This will provide the `this.$()` API to `Ember.Component`s, and
will make sure that the `EventDispatcher` will provide jQuery events to a component's event handler methods to 
maintain compatibility. `this.$()` deprecation warnings will still be displayed.

```bash
ember install @ember/jquery
ember install @ember/optional-features
ember feature:enable jquery-integration
```

For addons make sure that `@ember/jquery` is added as a `dependency` in its `package.json`!




