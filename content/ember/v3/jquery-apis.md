---
id: jquery-apis
title: Replace jQuery APIs
until: '4.0.0'
since: '3.8'
---

As jQuery will be removed from Ember by default, APIs that are coupled to jQuery have been deprecated.

The rationale behind it is that jQuery is not needed by Ember itself anymore, and as many apps (e.g. mobile apps) are 
sensitive about performance in general and here in particular their bundle size, it is often beneficial for those to
not ship with jQuery. If however this is not a major concern for your app, and you see value in using jQuery, it is 
absolutely legit to continue doing so. It is just not included by default anymore, and you would have to opt in to
using it with the `@ember/jquery` package as described below.

For addons it is a bit different as they are not aware of the context in which they are used. Any addon that still 
relies on jQuery will either force their consuming apps to continue bundling jQuery, or will not be usable for apps
that decide not to do so. Therefor it is highly recommended to not rely on jQuery in general, unless there is a good
reason (e.g. an addon wrapping a jQuery plugin).

#### Added deprecations

The main jQuery integration API that has been deprecated is the component's `$()` method, which would give you a 
jQuery object of the component's element. So instead of that you can use the `element` property, which provides a 
reference to a native DOM element:

```js
this.$().on('transitionend', () => this.doSomething());
```

should be changed to:

```js
this.element.addEventListener('transitionend', () => this.doSomething());
```

If you used `this.$()` to query for child elements, you can do so as well with native DOM APIs:

```js
this.$('.animated').on('transitionend', () => this.doSomething());
```

should be changed to:

```js
this.element.querySelectorAll('.animated')
  .forEach((el) => el.addEventListener('transitionend', () => this.doSomething()));
```

This applies in a similar fashion to component tests using the `setupRenderingTest()` helper. Instead of using 
`this.$()` in a test, you should use `this.element` (or alternatively the `find()`/`findAll()` helpers from 
`@ember/test-helpers`):

```js
test('it disables the button', async function(assert) {
  ...
  
  assert.ok(this.$('button').prop('disabled'), 'Button is disabled');
});
```

should be changed to:

```js
test('it disables the button', async function(assert) {
  ...
  
  assert.ok(this.element.querySelector('button').disabled, 'Button is disabled');
});
```


If you do continue to use jQuery, please make sure to always import it like this:

```js
import jQuery from 'jquery';
```

Accessing it from the `Ember` namespace as `Ember.$` (either directly or through destructuring) is and will remain 
deprecated.

#### Opting into jQuery

For apps and addons which are ok to work only with jQuery, you can opt into the jQuery integration now provided by
the `@ember/jquery` package. This will provide the `Ember.Component.$()` API without any deprecation warnings, and
will make sure that the `EventDispatcher` will provide jQuery events to a component's event handler methods to 
maintain compatibility.  

```bash
ember install @ember/jquery
ember install @ember/optional-features
ember feature:enable jquery-integration
```

For addons make sure that `@ember/jquery` is added as a `dependency` in its `package.json`!




