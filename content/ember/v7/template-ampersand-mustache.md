---
title: Unescaped `{{&foo}}` mustaches
until: 8.0.0
since: 7.5.0
---

The `{{&foo}}` form of an unescaped mustache is deprecated. It comes from Handlebars and means
exactly the same as the triple-curly form `{{{foo}}}`, which is the only form Ember documents.
Replace `{{&` with `{{{` and the closing `}}` with `}}}` (see below if the mustache uses `~`).

### Fixing it automatically with Prettier

If your project formats templates with [Prettier](https://prettier.io/), running it fixes this
deprecation for you: Prettier prints `{{&foo}}` as `{{{foo}}}`. This works for `.hbs` files and,
with
[`prettier-plugin-ember-template-tag`](https://github.com/ember-tooling/prettier-plugin-ember-template-tag),
for `<template>` tags in `.gjs` and `.gts` files.

```bash
npx prettier --write "app/**/*.{hbs,gjs,gts}"
```

Prettier also reformats anything else in those files that is not already formatted. If you only
want this change, use the manual fix below.

**Except with whitespace control.** If the mustache has a `~`, as in `{{~&foo}}` or `{{&foo~}}`,
Prettier prints `{{{~foo}}}` or `{{{foo~}}}`, which is a syntax error. Fix those by hand, as
shown below. (Checked with Prettier 2.8 through 3.9.)

### Fixing it by hand

To find every occurrence, search your templates for `{{&` (including the `{{~&` form):

```bash
grep -rnE '\{\{~?&' app
```

Before:

```handlebars
<p>{{&this.renderedMarkdown}}</p>
<div title={{&@title}}></div>
{{~&this.footer~}}
```

After:

```handlebars
<p>{{{this.renderedMarkdown}}}</p>
<div title={{{@title}}}></div>
{{~{this.footer}~}}
```

Arguments and named arguments stay as they are: `{{&format-html @value mode="short"}}` becomes
`{{{format-html @value mode="short"}}}`. When you use whitespace control, each tilde goes between
the first two or the last two braces: `{{~&foo~}}` becomes `{{~{foo}~}}`, `{{~&foo}}` becomes
`{{~{foo}}}`, and `{{&foo~}}` becomes `{{{foo}~}}`.

Both forms insert the value into the page as HTML without escaping it. This change keeps that
behavior exactly. If the value can contain user input, consider whether it should be unescaped at
all.
