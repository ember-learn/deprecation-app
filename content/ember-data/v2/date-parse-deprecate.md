---
id: date-prototype-extension
title: Date Prototype Extension
until: '3.0.0'
since: '2.7'
---

In previous versions of Ember Data, the native `Date.parse` function was
replaced with `Ember.Date.parse`, a [progressive enhancement for ISO
8601](https://github.com/csnover/js-iso8601) support in browsers that do not
support it (Safari 5-, IE 8-, Firefox 3.6-). Since these browser versions are no
longer supported by Ember or Ember data, this behavior has been deprecated.

To clear this deprecation, you should disable Ember Data's `Date` prototype
extension.

With Ember >= v2.7.0, disable the prototype extension for `Date`:

```javascript {data-filename=config/environment.js}
ENV = {
  EmberENV: {
    EXTEND_PROTOTYPES: {
      Date: false
    }
  }
}
```

With Ember < v2.7.0, values must be provided for all prototype extensions:

```javascript {data-filename=config/environment.js}
var ENV = {
  EmberENV: {
    EXTEND_PROTOTYPES: {
      Array: true,
      Date: false,
      Function: true,
      String: true
    }
  }
};
```

If you're not sure which prototype extensions your app already has enabled, you
can check `EmberENV.EXTEND_PROTOTYPES` in your browser's JavaScript console
while your app is running.

See [Disabling Prototype
Extensions](https://guides.emberjs.com/v2.10.0/configuring-ember/disabling-prototype-extensions/#toc_strings)
for more information about how Ember uses prototype extensions.
