---
title: "`<LinkTo>` positional arguments"
until: 4.0.0
since: 3.26.0
displayId: ember-glimmer.link-to.positional-arguments
---


Invoking the `<LinkTo>` component with positional arguments is deprecated.

See below how to migrate different usages of the component.

#### Inline form

Before:
```handlebars
{{link-to "About Us" "about"}}
          ~~~~~~~~~~~~~~~~~~

Invoking the `<LinkTo>` component with positional arguments is deprecated.
Instead, please use the equivalent named arguments (`@route`) and pass a
block for the link's content.
```

After:
```handlebars
<LinkTo @route="about">About Us</LinkTo>
```

#### Block form

Before:
```handlebars
{{#link-to "about"}}About Us{{/link-to}}
           ~~~~~~~

Invoking the `<LinkTo>` component with positional arguments is deprecated.
Instead, please use the equivalent named arguments (`@route`).
```

After:
```handlebars
<LinkTo @route="about">About Us</LinkTo>
```

#### Block form with single model

Before:
```handlebars
{{#link-to "post" @post}}Read {{@post.title}}...{{/link-to}}
           ~~~~~~~~~~~~

Invoking the `<LinkTo>` component with positional arguments is deprecated.
Instead, please use the equivalent named arguments (`@route`, `@model`).
```

After:
```handlebars
<LinkTo @route="post" @model={{@post}}>Read {{@post.title}}...</LinkTo>
```

#### Block form with multiple models

Before:
```handlebars
{{#link-to "post.comment" @comment.post @comment}}
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Comment by {{@comment.author.name}} on {{@comment.date}}
{{/link-to}}

Invoking the `<LinkTo>` component with positional arguments is deprecated.
Instead, please use the equivalent named arguments (`@route`, `@models`).
```

After:
```handlebars
<LinkTo @route="post.comment" @models={{array post comment}}>
  Comment by {{comment.author.name}} on {{comment.date}}
</LinkTo>
```

#### Query params

Before:
```handlebars
{{#link-to "posts" (query-params direction="desc" showArchived=false)}}
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Recent Posts
{{/link-to}}

Invoking the `<LinkTo>` component with positional arguments is deprecated.
Instead, please use the equivalent named arguments (`@route`, `@query`) and the
`hash` helper.
```

After:
```handlebars
<LinkTo @route="posts" @query={{hash direction="desc" showArchived=false}}>
  Recent Posts
</LinkTo>
```
