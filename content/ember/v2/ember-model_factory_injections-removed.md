---
id: ember-model_factory_injections-removed
title: 'Ember.MODEL_FACTORY_INJECTIONS removed'
until: '2.17.0'
since: '2.14'
---

The flag `Ember.MODEL_FACTORY_INJECTIONS` is no longer required, and can be
safely removed from your ember >= 2.13 application.

This flag was [added in 2013](https://github.com/emberjs/ember.js/commit/ffd9314620005c16e6cc05589a9e8b7ffc1da090) for Ember Data compatibility with the Dependency Injection (DI) system.
At the time, Ember's DI blurred the idea of a factory and a class which caused several issues,
including one that resulted in this flag being required.

Since then, both Ember and Ember Data have addressed the various issues which lead to this flag.
Most recently, Ember's DI system introduced the `factoryFor` API which separates factores and classes.
With this step, the flag in question no longer has any affect, and can be safely removed.
