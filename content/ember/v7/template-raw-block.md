---
title: Raw blocks (`{{{{foo}}}}...{{{{/foo}}}}`)
until: 8.0.0
since: 7.5.0
---

Raw blocks, written with four curly braces as in `{{{{my-component}}}}...{{{{/my-component}}}}`,
are deprecated. They come from Handlebars. A raw block is an ordinary block invocation of
`my-component` whose body is not processed for mustaches: any `{{...}}` inside it is literal text.
HTML inside the body is still parsed as HTML.

To fix it, write the block with `{{#` and `{{/`, and escape each mustache in its body with a
backslash, `\{{`, so that it stays literal text.

### Fixing it automatically with Prettier

If your project formats templates with [Prettier](https://prettier.io/), running it fixes this
deprecation for you: Prettier prints a raw block as an ordinary block with every `{{` in its body
escaped as `\{{`, which renders the same thing. This works for `.hbs` files and, with
[`prettier-plugin-ember-template-tag`](https://github.com/ember-tooling/prettier-plugin-ember-template-tag),
for `<template>` tags in `.gjs` and `.gts` files.

```bash
npx prettier --write "app/**/*.{hbs,gjs,gts}"
```

Prettier also reformats anything else in those files that is not already formatted. If you only
want this change, use the manual fix below.

### Fixing it by hand

To find every occurrence, search your templates for four opening braces:

```bash
grep -rn '{{{{' app
```

Then, for each raw block:

1. Change the opening `{{{{name ...}}}}` to `{{#name ...}}`, keeping any arguments.
2. Change the closing `{{{{/name}}}}` to `{{/name}}`.
3. In the body, put a backslash in front of every `{{`, so it stays literal text.

Before:

```handlebars
{{{{code-sample language="handlebars"}}}}
  <p>Hello, {{@name}}!</p>
{{{{/code-sample}}}}
```

After:

```handlebars
{{#code-sample language="handlebars"}}
  <p>Hello, \{{@name}}!</p>
{{/code-sample}}
```

Both render the `code-sample` component with the text `Hello, {{@name}}!` inside a `<p>` in its
block. Only `{{` needs the backslash: `}}` is ordinary text. A triple curly in the body is escaped
the same way, as `\{{{`.

If the body was in a raw block so that it could show template code, you may find it clearer to
pass that code as a string instead, for example
`<CodeSample @language="handlebars" @code={{"<p>Hello, {{@name}}!</p>"}} />`. A string literal
*inside* a mustache is never processed for mustaches. (A quoted attribute value is:
`@code="Hello, {{@name}}"` would insert the value of `@name`.)
