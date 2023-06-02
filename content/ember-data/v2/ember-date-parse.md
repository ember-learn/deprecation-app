---
id: ember-date-parse
title: Ember.Date.parse
until: '3.0.0'
since: '2.7'
---

`Ember.Date.parse` was created as a [progressive enhancement for ISO
8601](https://github.com/csnover/js-iso8601) support in browsers that do not
support it (Safari 5-, IE 8-, Firefox 3.6-). These browsers versions are no
longer supported by Ember or Ember Data so `Ember.Date.parse` has been
deprecated.

To clear this deprecation you should refactor your application's code to use
`Date.parse` instead of `Ember.Date.parse`.
