---
id: view-and-controller-options-on-the-code-each-code-helper
title: View and Controller options on the `{{each}}` helper
until: ''
since: '1.13'
---

The options `itemView`, `itemViewClass`, `tagName`, `emptyView`,
`emptyViewClass` and `itemController` on the `{{each}}` helper have been deprecated.

These options were added when controllers were more prominent, and the
component story was less fully fleshed out. In Ember 1.13+, using these options
triggers a less performant compatibility mode.

The usage of all the above mentioned options should be replaced with components.

#### An example

```handlebars
{{each view.comments itemController="comment"
                     itemView="commentView"
                     emptyView="noCommentsView"
                     tagName="ul"}}
```

Can be replaced with:

```handlebars
<ul>
  {{#each comments as |comment|}}
    {{post-comment comment=comment}}
  {{else}}
    {{no-comments}}
  {{/each}}
</ul>
```

#### Breaking the example down

The `comment` controller and `commentView` view have been refactored into the
`{{post-comment}}` component.

The `noCommentsView` has been refactored in to the `{{no-comments}}` component.

Instead of the `itemController="comment"` and `itemView="commentView"` we use
the newly created `{{post-comment}}` component.

Instead of the `emptyView="noCommentsView"` we use the `{{no-comments}}`
component.

We replaced `tagName="ul"` part by just surrounding the `{{each}}` block with
`<ul>` tags.


