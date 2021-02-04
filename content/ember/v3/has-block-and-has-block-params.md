---
id: has-block-and-has-block-params
title: "{{hasBlock}} and {{hasBlockParams}}"
until: '4.0.0'
since: 'Upcoming Features'
---

#### `{{hasBlock}}`

The `{{hasBlock}}` property is true if the component was given a default block,
and false otherwise. To transition away from it, you can use the `(has-block)`
helper instead.

```hbs
{{hasBlock}}

{{! becomes }}
{{has-block}}
```

Unlike `{{hasBlock}}`, the `(has-block)` helper must be called, so in nested
positions you will need to add parentheses around it:

```hbs
{{#if hasBlock}}

{{/if}}


{{! becomes }}
{{#if (has-block)}}

{{/if}}
```

You may optionally pass a name to `(has-block)`, the name of the block to check.
The name corresponding to the block that `{{hasBlock}}` represents is "default".
Calling `(has-block)` without any arguments is equivalent to calling
`(has-block "default")`.

#### `{{hasBlockParams}}`

The `{{hasBlockParams}}` property is true if the component was given a default block
that accepts block params, and false otherwise. To transition away from it, you can
use the `(has-block-params)` helper instead.

```hbs
{{hasBlockParams}}

{{! becomes }}
{{has-block-params}}
```

Unlike `{{hasBlockParams}}`, the `(has-block-params)` helper must be called, so in nested
positions you will need to add parentheses around it:

```hbs
{{#if hasBlockParams}}

{{/if}}


{{! becomes }}
{{#if (has-block-params)}}

{{/if}}
```

You may optionally pass a name to `(has-block-params)`, the name of the block to check.
The name corresponding to the block that `{{hasBlockParams}}` represents is "default".
Calling `(has-block-params)` without any arguments is equivalent to calling
`(has-block-params "default")`.
