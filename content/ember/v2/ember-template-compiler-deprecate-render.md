---
id: ember-template-compiler.deprecate-render
title: "{{render helper"
until: '3.0.0'
since: '2.11'
---

Using the `{{render` helper is deprecated in favor of using components.
Please refactor uses of this helper to components:

For example, if you had:

```handlebars
{{render 'my-sidebar'}}
```

```handlebars {data-filename=app/templates/my-sidebar.hbs}
<p>template stuff here</p>
```

```javascript {data-filename=app/controllers/my-sidebar.js}
export default Ember.Controller.extend({
});
```

You would refactor to a component like so:

```handlebars
{{my-sidebar}}
```

```handlebars {data-filename=app/templates/components/my-sidebar.hbs}
<p>template stuff here</p>
```

```handlebars {data-filename=app/components/my-sidebar.js}
export default Ember.Component.extend({
});
```

Note that the render helper has several unique behaviors that may require further refactoring work during migration to a component.

- When using the render helper with no model argument, the controller instance is a singleton. For example the same controller instance is shared between `{{render 'post'}}`, any other helper usage of `{{render 'post'}}`, a route template named post, and dependency injections using `Ember.inject.service('post')`.
- When sendAction is called in a rendered controller, or when `{{action` is used in a render helper template, the bubbling target for those actions is the router and current active route. With components, those same actions would target only the component instance without bubbling.
