---
title: Blocks that start with `{{^`
until: 8.0.0
since: 7.5.0
---

Starting a block with `{{^` instead of `{{#`, as in `{{^if this.isLoggedIn}}...{{else}}...{{/if}}`,
is deprecated. This "inverse block" form comes from Handlebars. It swaps the two halves of the
block: the part before `{{else}}` is what renders when the condition is *false*, and the part after
`{{else}}` is what renders when it is *true*.

To fix it, start the block with `{{#` and swap the two halves, so that it reads the way it
renders. (An inverse block *without* `{{else}}`, like `{{^if x}}...{{/if}}`, is already a syntax
error.)

### Fixing it automatically with Prettier

If your project formats templates with [Prettier](https://prettier.io/), running it fixes this
deprecation for you: Prettier prints `{{^foo}}a{{else}}b{{/foo}}` as `{{#foo}}b{{else}}a{{/foo}}`,
which renders the same thing. This works for `.hbs` files and, with
[`prettier-plugin-ember-template-tag`](https://github.com/ember-tooling/prettier-plugin-ember-template-tag),
for `<template>` tags in `.gjs` and `.gts` files.

```bash
npx prettier --write "app/**/*.{hbs,gjs,gts}"
```

Prettier also reformats anything else in those files that is not already formatted. If you only
want this change, use the manual fix below. And if the block has block parameters (`as |item|`),
read "Block parameters" below first.

### Fixing it by hand

To find every occurrence, search your templates for a block that starts with `{{^` followed by a
name:

```bash
grep -rnE '\{\{~?\^[[:space:]]*[^}~[:space:]]' app
```

Before:

```handlebars
{{^if this.isLoggedIn}}
  Please log in.
{{else}}
  Welcome back!
{{/if}}
```

After, with the two halves swapped:

```handlebars
{{#if this.isLoggedIn}}
  Welcome back!
{{else}}
  Please log in.
{{/if}}
```

For `if`, you can instead keep the halves in their original order and use `unless`, which also
renders the same thing:

```handlebars
{{#unless this.isLoggedIn}}
  Please log in.
{{else}}
  Welcome back!
{{/unless}}
```

The same swap works for any block, for example `each`:

Before:

```handlebars
{{^each this.results}}
  No results.
{{else}}
  {{this.results.length}} results found.
{{/each}}
```

After:

```handlebars
{{#each this.results}}
  {{this.results.length}} results found.
{{else}}
  No results.
{{/each}}
```

If you use `~` whitespace control, keep each tilde on the same delimiter it was on: the opening
`{{^each ...~}}` becomes `{{#each ...~}}`, and the tildes on `{{else}}` and `{{/each}}` stay where
they are.

### Block parameters

Block parameters on an inverse block never worked. In
`{{^each this.items as |item|}}...{{else}}{{item}}{{/each}}`, the `as |item|` is ignored, so the
`{{item}}` after `{{else}}` does not refer to the current item: it is looked up as a separate name.
Prettier's fix keeps that behavior and drops the `as |item|`.

If you meant the block parameter to work, which is almost certainly the case, write the block the
way it was intended, with `as |item|` on the `{{#each}}`:

Before:

```handlebars
{{^each this.items as |item|}}
  No items.
{{else}}
  <li>{{item.name}}</li>
{{/each}}
```

After:

```handlebars
{{#each this.items as |item|}}
  <li>{{item.name}}</li>
{{else}}
  No items.
{{/each}}
```

This renders the items' names, which the original template did not, so check the result.
