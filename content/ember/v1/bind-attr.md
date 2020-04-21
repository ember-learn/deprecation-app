---
id: bind-attr
title: bind-attr
until: ''
since: '1.13'
---

Ember 1.11 introduced new syntax for using dynamic content in attributes.

In 1.10 your only option was to use the `bind-attr` helper:

```handlebars
<div {{bind-attr title=post.popup}}></div>
```

Ember 1.11 made it possible to intuitively represent dynamic content in attributes as you would expect:

```handlebars
<div title="{{post.popup}}"></div>
```

This makes it possible to express a number of concepts directly in the template that previously were awkward to represent and required computer properties, and could even require `itemController`.

#### Dasherized boolean values

Ember 1.11's attribute binding syntax no longer supports dasherizing for boolean values. For example:

```javascript {data-filename=app/components/user-profile.js}
export default Ember.Component.extend({
  isActiveUser: true
});
```

```handlebars {data-filename=app/templates/components/user-profile.hbs}
<div {{bind-attr class="isActiveUser"}}>
</div>
```

Should be replaced with:

```handlebars {data-filename=app/templates/components/user-profile.hbs}
<div class="{{if isActiveUser 'is-active-user'}}">
</div>
```

#### Legacy `bind-attr`

Ember 1.13 deprecated `bind-attr` in favor of the new syntax.

To aid in the migration, you can use the [legacy-bind-attr plugin](https://github.com/emberjs/legacy-bind-attr) to restore this behavior in Ember 2.0 and silence the deprecation warning.
