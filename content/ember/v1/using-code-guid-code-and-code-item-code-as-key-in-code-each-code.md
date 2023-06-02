---
id: using-code-guid-code-and-code-item-code-as-key-in-code-each-code
title: Using @guid and @item as key in {{each}}
until: ''
since: '1.13'
---

As of 1.13.2 you should not use `key='@guid'` or `key='@item'` in the `{{each}}` helper. It is
[documented in 1.13](http://guides.emberjs.com/v1.13.0/templates/displaying-a-list-of-items/#toc_specifying-keys)
that you can use these special values to uniquely identify each array entry so that the view code could
more efficiently re-render the display of the list.

This process was simplified as part of a [bugfix](https://github.com/emberjs/ember.js/pull/11461),
where the key now implicitly defaults to `@identity`, which will pick either a guid or an item identifier based on type
of each array entry. Therefore, providing the key attribute is no longer required for re-render optimizations.

Applications should replace instances of:

```handlebars
{{#each people key='@guid' as |person|}}
...
{{/each}}
```

and

```handlebars
{{#each people key='@item' as |person|}}
...
{{/each}}
```

with

```handlebars
{{#each people as |person|}}
...
{{/each}}
```