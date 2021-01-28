---
id: ember-glimmer.link-to.positional-arguments
title: Deprecate `LinkTo` positional arguments
until: '4.0.0'
since: 'Upcoming'
---

Invoking the `<LinkTo>` component with positional arguments is deprecated.

See below how to migrate different usages of the component:

```hbs
Deprecated:

{{link-to "About Us" "about"}}
          ~~~~~~~~~~~~~~~~~~

Invoking the `<LinkTo>` component with positional arguments is deprecated.
Instead, please use the equivalent named arguments (`@route`) and pass a
block for the link's content.

<LinkTo @route="about">About Us</LinkTo>
```

```hbs
Deprecated:

{{#link-to "about"}}About Us{{/link-to}}
           ~~~~~~~

Invoking the `<LinkTo>` component with positional arguments is deprecated.
Instead, please use the equivalent named arguments (`@route`).

Replacement:

<LinkTo @route="about">About Us</LinkTo>
```


```hbs
Deprecated:

{{#link-to "post" @post}}Read {{@post.title}}...{{/link-to}}
           ~~~~~~~~~~~~

Invoking the `<LinkTo>` component with positional arguments is deprecated.
Instead, please use the equivalent named arguments (`@route`, `@model`).

Replacement:

<LinkTo @route="post" @model={{@post}}>Read {{@post.title}}...</LinkTo>
```

```hbs
Deprecated:

{{#link-to "post.comment" @comment.post @comment}}
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Comment by {{@comment.author.name}} on {{@comment.date}}
{{/link-to}}

Invoking the `<LinkTo>` component with positional arguments is deprecated.
Instead, please use the equivalent named arguments (`@route`, `@models`).

Replacement:

<LinkTo @route="post.comment" @models={{array post comment}}>
  Comment by {{comment.author.name}} on {{comment.date}}
</LinkTo>
```

```hbs
Deprecated:

{{#link-to "posts" (query-params direction="desc" showArchived=false)}}
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Recent Posts
{{/link-to}}

Invoking the `<LinkTo>` component with positional arguments is deprecated.
Instead, please use the equivalent named arguments (`@route`, `@query`) and the
`hash` helper.

Replacement:

<LinkTo @route="posts" @query={{hash direction="desc" showArchived=false}}>
  Recent Posts
</LinkTo>
```