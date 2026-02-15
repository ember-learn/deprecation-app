---
title: Ember.LinkView
until: 2.0.0
since: 1.13.0
---


As a consequence of the deprecation of `Ember.View`, many internal views have
been ported to component. `Ember.LinkView`, the class that backs the
`{{link-to}}` helper, have been ported to `Ember.LinkComponent`.

Most uses of `Ember.LinkView` can be directly ported to the `Ember.LinkComponent`
class.
