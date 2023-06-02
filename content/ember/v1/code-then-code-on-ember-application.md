---
id: code-then-code-on-ember-application
title: .then on Ember.Application
until: ''
since: '1.7'
---

As part of the `Ember.DeferredMixin` deprecation, using `.then` on an
Ember.Application instance itself has been deprecated.

You can use the `ready` hook or initializers to defer/advance readiness
instead.
