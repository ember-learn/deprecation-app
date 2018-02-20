---
id: more-consistent-handlebars-scope
title: More Consistent Handlebars Scope
until: ''
since: '1.9'
---

In Ember 1.9, the `each` and `with` helpers come in two flavors: a "context-switching" flavor and a "named-parameter" flavor.

```handlebars
{{#each post in posts}}
  {{!-- the context in here is the same as the outside context,
        and `post` references the current iteration --}}
{{/each}}

{{#each posts}}
  {{!-- the context in here has shifted to the individual post.
        the outer context is no longer accessible --}}
{{/each}}

{{#with post as otherPost}}
  {{!-- the context in here is the same as the outside context }}
{{/with}}

{{#with post}}
  {{!-- the context in here has shifted to the post.
        the outer context is no longer accessible --}}
{{/with}}
```

This has proven to be one of the more confusing parts of the Ember templating system. It is also not clear to
beginners which to use, and when they choose the context-shifting form, they lose access to values in the outer
context that may be important.

Because the helper itself offers no clue about the context-shifting behavior, it is easy (even for more experienced
Ember developers) to get confused when skimming a template about which object a value refers to.

The context-shifting forms of `#each` and `#with` have been deprecated in favor of the named-parameter forms. In Ember 1.12, the `in` and `as` syntax are further deprecated in favor of block params syntax. See the [deprecation notes for in](/ember/v1.x/#toc_id-code-in-code-syntax-for-code-each-code) and [deprecation notes for as](/ember/v1.x/#toc_id-code-as-code-sytnax-for-code-with-code).
