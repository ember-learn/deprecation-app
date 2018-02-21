---
id: rendering-into-a-render-helper-that-resolves-to-an-outlet
title: 'Rendering into a {{render}} helper that resolves to an {{outlet}}'
until: '3.0.0'
since: '2.11'
---

Before named outlets were introduced to Ember the render helper was used to declare slots for `this.render` in routes. This usage is not common in modern, idiomatic applications and is deprecated. In general, the pattern of named outlets or named render helpers is discouraged. Instead use of [ember-elsewhere](https://github.com/ef4/ember-elsewhere) or another DOM-redirection library should better serve these use cases.

For example this code uses the render helper as a target for a special sidebar present on the index route. The special sidebar is in a template named `index-sidebar`:

```handlebars {data-filename=app/templates/application.hbs}
<div class="sidebar">{{render 'sidebar'}}</div>
<div class="main">{{outlet}}</div>
```

```handlebars {data-filename=app/templates/index.hbs}
Index Content
```

```javascript {data-filename=app/routes/index.js}
App.IndexRoute = Ember.Route.extend({
  renderTemplate() {
    this._super(...arguments);
    this.render('index-sidebar', { into: 'sidebar' });
  },
  actions: {
    willTransition() {
      this.disconnectOutlet({
        parentView: 'application',
        outlet: 'sidebar'
      });
    }
  }
});
```

It should be refactored to use [ember-elsewhere](https://github.com/ef4/ember-elsewhere). The sidebar content must be implemented as a component, in this case named `index-sidebar`. The logic previously used in the route file can be removed. The refactored example:

```handlebars {data-filename=app/templates/application.hbs}
<div class="sidebar">{{from-elsewhere name='sidebar'}}</div>
<div class="main">{{outlet}}</div>
```

```handlebars {data-filename=app/templates/index.hbs}
{{to-elsewhere named='sidebar' send=(component 'index-sidebar')}}
Index Content
```

For more informations of how to use `ember-elsewhere`, please visit the official
documentation [here](https://github.com/ef4/ember-elsewhere#ember-elsewhere).
