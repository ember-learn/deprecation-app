---
id: block-and-multi-argument-unbound-helper
title: Block and multi-argument unbound helper
until: ''
since: '1.13'
---

The unbound helper is mostly a legacy API in Ember, although it is not being
removed in 2.0. It was almost exclusively used to manage performance issues
which are well addressed in Ember 1.13's new rendering engine.

The first form being deprecated is the block form of unbound. For example:

```handlebars
{{#unbound if someState}}
  Show this
{{/unbound}}
```

Instead, replace this form with a nested helper:

```handlebars
{{#if (unbound someState)}}
  Show this
{{/if}}
```

The second form being deprecated is the non-nested helper lookup. For example:

```handlebars
{{unbound some-custom-helper withArg anotherArg}}
```

Replace this form with nested helper call:

```handlebars
{{unbound (some-custom-helper withArg anotherArg)}}
```

Or make all inputs to the helper unbound:

```handlebars
{{some-custom-helper (unbound withArg) (unbound anotherArg)}}
```
