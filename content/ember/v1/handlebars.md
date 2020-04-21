---
id: handlebars-htmlbars-helpers
title: Handlebars / HTMLBars helpers
until: ''
since: '1.13'
---

All the various ways to create helpers on the Handlebars and HTMLBars namespace
have been deprecated in favor of the
[Ember.Helper](http://emberjs.com/api/classes/Ember.Helper.html) class and it's
[Ember.Helper.helper](http://emberjs.com/api/classes/Ember.Helper.html#method_helper)
function. The `makeViewHelper` method has been deprecated in favor of just using
an `Ember.Component`.

#### `makeViewHelper`

If you use `viewHelper` you should refactor the view class and template into
a component with the same name as the view helper you registered.

#### `makeBoundHelper`, `registerBoundHelper`, `helper`, `registerHelper`

If you have for example:

```javascript {data-filename=app/helpers/foo-bar.js}
export default Ember.HTMLBars.makeBoundHelper(function(firstArg, secondArg, options) {
  let { hash } = options;
  // helper code
});
```

or

```javascript
Ember.Handlebars.registerHelper('foo-bar', function(firstArg, secondArg, options) {
  let { hash } = options;
  // helper code
});
```

you can replace those with:

```javascript {data-filename=app/helpers/foo-bar.js}
export default Ember.Helper.helper(function([firstArg, secondArg], hash) {
  // helper code
});
```
