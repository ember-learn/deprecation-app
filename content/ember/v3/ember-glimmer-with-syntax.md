---
title: "`{{with}}` helper"
until: 4.0.0
since: 3.26.0
displayId: ember-glimmer.with-syntax
---


The use of `{{with}}` has been deprecated. You should replace it with either `{{let}}` or a combination of `{{let}}`, `{{if}}` and `{{else}}`: 

**If you always want the block to render, replace `{{with}}` with `{{let}}` directly:**

Before:

```handlebars
{{#with (hash name="Ben" age=4) as |person|}}
  Hi {{person.name}}, you are {{person.age}} years old.
{{/with}}
```

After:

```handlebars
{{#let (hash name="Ben" age=4) as |person|}}
  Hi {{person.name}}, you are {{person.age}} years old.
{{/let}}
```

**If you want to render a block conditionally, use a combination of `{{let}}` and `{{if}}`:**

Before:

```handlebars
{{#with user.posts as |blogPosts|}}
  There are {{blogPosts.length}} blog posts
{{/with}}
```

After:

```handlebars
{{#let user.posts as |blogPosts|}}
  {{#if blogPosts}}
    There are {{blogPosts.length}} blog posts
  {{/if}}
{{/let}}
```

**If you want to render a block conditionally, and otherwise render an alternative block, use a combination of `{{let}}`, `{{if}}` and `{{else}}`:**

Before:

```handlebars
{{#with user.posts as |blogPosts|}}
  There are {{blogPosts.length}} blog posts
{{else}}
  There are no blog posts
{{/with}}
```

After:

```handlebars
{{#let user.posts as |blogPosts|}}
  {{#if blogPosts}}
    There are {{blogPosts.length}} blog posts
  {{else}}
    There are no blog posts
  {{/if}}
{{/let}}
```
