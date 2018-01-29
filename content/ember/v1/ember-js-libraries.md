---
id: ember-js-libraries-and-plugins
title: Ember.js libraries and plugins
until: ''
since: '1.8'
---

If the code triggering this deprecation is being fired from a library, that
library may need to update its suggested usage.

One solution for such a library is to provide mixins instead of classes:

```js
// usage is {{view "list"}}
var App.ListView = Ember.View.extend(ListView);
```

A more advanced solution is to use an initializer to register the plugin's
views on the application:

```js
// usage is {{view "list"}}
Ember.Application.initializer({
  name: 'list-view',
  initialize: function(container, application) {
    container.register('view:list', ListView);
  }
});
```

More details on how to register an Ember.js framework component are available
in the [initializer API documentation](/api/classes/Ember.Application.html#toc_initializers)
and the [dependency injection guide](/guides/understanding-ember/dependency-injection-and-service-lookup).
