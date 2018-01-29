---
id: new-usage-of-ember-select
title: New usage of Ember.Select
until: ''
since: '1.8'
---

Most of Ember's provided views are already accessed via helpers. For example,
the [Ember.TextField](/api/classes/Ember.TextField.html) view is used via the
[input helper](/api/classes/Ember.Handlebars.helpers.html#method_input).

The [Ember.Select](/api/classes/Ember.Select.html) view has not been upgraded to
have a helper. Instead, it was suggested that you call it via the global
class name:

```handlebars
{{view Ember.Select content=manyItems}}
```

Since this lookup is now deprecated, the select view has been registered
on an application as `select`. The new usage is:

```handlebars
{{view "select" content=manyItems}}
```

See the updated [Ember.Select](/api/classes/Ember.Select.html) documentation
and the [built-in views guide](/guides/views/built-in-views) for more details
and examples.
