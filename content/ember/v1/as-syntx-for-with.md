---
id: code-as-code-syntax-for-code-with-code
title: as syntax for {{with}}
until: ''
since: '1.12'
---

Renaming a value using `{{with}}` has been possible using the `as` syntax. Block params,
introduces in Ember 1.10, obsolete the `as` syntax.

With helpers should be updated to use block params. For example this helper:

```handlebars
{{#with foo as bar}}
```

Can be converted as follows:

```handlebars
{{#with foo as |bar|}}
```
