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

The context-shifting forms of `#each` and `#with` have been deprecated in favor of the named-parameter forms. In Ember 1.12, the `in` and `as` syntax are further deprecated in favor of block params syntax. See the [deprecation notes for in](/deprecations/v1.x/#toc_code-in-code-syntax-for-code-each-code) and [deprecation notes for as](/deprecations/v1.x/#toc_code-in-code-syntax-for-code-each-code).

#### Transition Plan
To transition your code to the new syntax, you can change templates that look like this:

```handlebars
{{#each people}}
  <p>{{firstName}} {{lastName}}</p>
  <p>{{address}}</p>
{{/each}}
```

with:

```handlebars
{{#each person in people}}
  <p>{{person.firstName}} {{person.lastName}}</p>
  <p>{{person.address}}</p>
{{/each}}
```

In preparation for further work on HTMLBars, the context switching form of `{{each}}` is deprecated. This is mostly a "mechanical" refactor and dramatically
simplifies how to think about the context in your templates. This change should be entirely mechanical.

In prior versions you may have done one of the following:

```handlebars
<ul>
  {{#each}}
    <li>{{name}}</li>
  {{/each}}
</ul>
```

```handlebars
<ul>
  {{#each people}}
    <li>{{name}}</li>
  {{/each}}
</ul>
```

You should now be using:

```handlebars
<ul>
  {{#each person in this}}
    <li>{{person.name}}</li>
  {{/each}}
</ul>
```

```handlebars
<ul>
  {{#each person in people}}
    <li>{{person.name}}</li>
  {{/each}}
</ul>
```
