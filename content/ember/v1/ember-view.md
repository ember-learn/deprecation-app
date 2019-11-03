---
id: ember-view
title: Ember.View
until: ''
since: '1.13'
---

Ember 1.x encouraged a Model-View-Controller-Route architecture. Since then,
the web has consolidated around a Model-Component-Route pattern for web
development that Ember 2.0 also embraces.

Views are removed from the Ember 2.0 API. However a single release is likely
insufficient for large apps to upgrade their entire codebase away from routable
views, and consequently Ember is providing extended support for views via the
[ember-legacy-views](https://github.com/emberjs/ember-legacy-views) addon.
This addon will remain compatible with Ember until v2.4 of the framework
is released.

Along with the deprecation of `Ember.View`, the `Ember.CoreView` class is also
deprecated. If you were using this class, please migrate to `Ember.Component`.

#### Migrating away from the view helper

In most cases Ember views can be replaced with a component. For example
this view and usage:

```handlebars {data-filename=app/templates/show-menu.hbs}
{{view.title}}
```

```javascript {data-filename=app/views/show-menu.js}
import Ember from "ember";

// Usage: {{view "show-menu"}}
export default Ember.View.extend({
  templateName: 'some-menu',
  title: 'My Menu'
});
```

Can be replaced with this component:

```handlebars {data-filename=app/templates/components/show-menu.hbs}
{{title}}
```

```javascript {data-filename=app/components/show-menu.js}
import Ember from "ember";

// Usage: {{show-menu}}
export default Ember.Component.extend({
  title: 'My Menu'
});
```

Note that a component is always its own context in a template. A view's template
may have had access to other variables that were present where it was called,
such as a `controller`. A component template will always be isolated, and
if data is needed it should be passed upon invocation. For example:

```handlebars
{{show-menu options=controller.menuOptions}}
```
#### Differences in yielded blocks

Some notable differences exist between yielded view blocks and yielded component
blocks. A view could be used this way:

```javascript {data-filename=app/views/reverse-name.js}
import Ember from "ember";

export default Ember.View.extend({
  reversedName: Ember.computed('name', function() {
    return this.get('name').split("").reverse().join("");
  })
});
```

```handlebars
{{#view "reverse-name" name=controller.name}}
  {{view.reversedName}}
{{/view}}
```

Components introduced block params. This concept achieves data passing
without the confusion over what `{{view}}` refers to. For example:

```javascript {data-filename=app/components/reverse-name.js}
import Ember from "ember";

export default Ember.Component.extend({
  reversedName: Ember.computed('name', function() {
    return this.get('name').split("").reverse().join("");
  })
});
```

```handlebars {data-filename=app/templates/components/reverse-name.hbs}
{{yield reversedName}}
```

```handlebars
{{#reverse-name name=controller.name as |reversedName|}}
  {{reversedName}}
{{/reverse-name}}
```

Just as passing values to a component allow access to those values in the
isolated template of that component, yielding block params allow for values
from the component to be passed to the location the component was called at.

#### Routable Views

When a template for a given route is rendered, if there is a view with the
same name that view will also be used. For example this view is attached
to the rendered route template:

```javascript {data-filename=app/router.js}
import Ember from "ember";

export default Ember.Router.map(function() {
  this.route('about');
});
```

```javascript {data-filename=app/views/about.js}
import Ember from "ember";

export default Ember.View.extend({
  classNameBindings: ['controller.isActive:active']
});
```

There are only two reasons a view may be used for a route.

  * To set attribute bindings
  * To attach event handlers

You should migrate away from routed views. For example to attach
bindings an element in the template is sufficient:

```javascript {data-filename=app/router.js}
import Ember from "ember";

export default Ember.Router.map(function() {
  this.route('about');
});
```

```handlebars {data-filename=app/templates/about.hbs}
<div class="{{if isActive 'active'}}">
  <!-- something something -->
</div>
```

If attaching events or sharing DOM is necessary, consider a component:

```javascript {data-filename=app/router.js}
import Ember from "ember";

export default Ember.Router.map(function() {
  this.route('about');
});
```

```handlebars {data-filename=app/templates/about.hbs}
{{#active-layout isActive=isActive}}
  <!-- something something -->
{{/active-layout}}
```

```javascript {data-filename=app/components/active-layout.js}
import Ember from "ember";

export default Ember.Component.extend({
  classNameBindings: ['isActive:active'],
  click() {
    // Handle click
  }
});
```
#### view and controller template keywords

View and controller keywords provided a way to access the view or controller
backing a template, even across scopes that you might expect to be isolated. In
many ways their behavior is emergent, and generally is poorly designed.

Accessing data via `{{view.someProp}}` or `{{controller.thisThing}}` can
nearly always be replaced by proper use of data passing and block params. See
the guide on [differences in yielded blocks](http://emberjs.com/deprecations/v1.x#toc_differences-in-yielded-blocks)
for a complete example of using block params over the `{{view}}` keyword.


#### `view` and `viewClass` arguments to `{{outlet}}`

Since the View API is deprecated starting in 1.13, providing the `view` or `viewClass` argument to the `{{outlet}}`
helper is likewise deprecated in favor of migrating to component-based approaches, as explained earlier in this
section.