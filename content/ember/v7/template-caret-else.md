---
title: Using `{{^}}` instead of `{{else}}`
until: 8.0.0
since: 7.5.0
---

Using `{{^}}` to start the `{{else}}` section of a block is deprecated. It comes from Handlebars
and means exactly the same as `{{else}}`. Replace each `{{^}}` with `{{else}}`.

### Fixing it automatically with Prettier

If your project formats templates with [Prettier](https://prettier.io/), running it fixes this
deprecation for you: Prettier always prints `{{^}}` as `{{else}}`, and keeps any `~` whitespace
control. This works for `.hbs` files and, with
[`prettier-plugin-ember-template-tag`](https://github.com/ember-tooling/prettier-plugin-ember-template-tag),
for `<template>` tags in `.gjs` and `.gts` files.

```bash
npx prettier --write "app/**/*.{hbs,gjs,gts}"
```

Prettier also reformats anything else in those files that is not already formatted. If you only
want this change, use the manual fix below.

### Fixing it by hand

To find every occurrence, search your templates for `{{^}}` (including the `{{~^~}}` forms):

```bash
grep -rnE '\{\{~?\^[[:space:]]*~?\}\}' app
```

Before:

```handlebars
{{#if this.isLoggedIn}}
  Welcome back!
{{^}}
  Please log in.
{{/if}}

{{#each this.items as |item|}}
  <li>{{item.name}}</li>
{{~^~}}
  <li>No items</li>
{{/each}}
```

After:

```handlebars
{{#if this.isLoggedIn}}
  Welcome back!
{{else}}
  Please log in.
{{/if}}

{{#each this.items as |item|}}
  <li>{{item.name}}</li>
{{~else~}}
  <li>No items</li>
{{/each}}
```

Keep any `~` where it was: `{{~^}}` becomes `{{~else}}`, `{{^~}}` becomes `{{else~}}`, and
`{{~^~}}` becomes `{{~else~}}`.

This deprecation is only about `{{^}}` on its own. A block that *starts* with `{{^`, such as
`{{^if this.isLoggedIn}}`, is a different deprecated form with
[its own guide](/deprecations/v7.x/#toc_template-inverse-block-with-else).
