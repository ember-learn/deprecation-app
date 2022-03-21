---
id: ember.link-to.disabled-when
title: LinkTo @disabled-when argument
until: '4.0.0'
since: '3.27'
---

Passing `@disabled-when` argument to `<LinkTo>` component has been deprecated. You can use `@disabled` instead.

Before:
```handlebars
<LinkTo @route='photoGallery' @disabled-when={{true}}>
  Great Dragon Photos
</LinkTo>
```


After:
```handlebars
<LinkTo @route='photoGallery' @disabled={{true}}>
  Great Dragon Photos
</LinkTo>
```
