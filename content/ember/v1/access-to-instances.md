---
id: deprecate-access-to-instances-in-initializers
title:  Access to Instances in Initializers
until: ''
since: '1.11'
---

Previously, initializers had access to an object that allowed them to
both register new classes and get instances of those classes.

If you have an initializer that gets instances of a class, you need to
change it to use an instance initializer.

Change code that looks like this:

```javascript
App.initializer({
  name: "clock",

  initialize: function(container, application) {
    application.register("clock:main", Clock);
    var clock = container.lookup("clock:main");
    clock.setStartTime(Date.now());
  }
});
```

To:

```javascript
App.initializer({
  name: "clock",

  initialize: function(registry, application) {
    application.register("clock:main", Clock);
  }
});

App.instanceInitializer({
  name: "clock",

  initialize: function(instance) {
    var clock = instance.container.lookup("clock:main");
    clock.setStartTime(Date.now());
  }
});
```

Added in [PR #10256](https://github.com/emberjs/ember.js/pull/10256).

For more information, see [the instance initializer deprecation
guide](../instance-initializers).
