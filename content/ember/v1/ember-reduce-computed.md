---
id: ember-reducecomputed-ember-arraycomputed
title: Ember.ReduceComputed / Ember.ArrayComputed
until: ''
since: '1.13'
---

These two little monsters served us well for a long time. They provided semantics that allowed to perform in-place modifications of an existing array instead of replacing the entire array like the regular `map/reduce` methods in javascript do, which was necessary to avoid expensive repaintings when rendering lists with the `{{each}}` helper.

But now that with the new glimmer engine you can generate a entirely new array and let glimmer handle the diffing for you they've become an unnecessary and overcomplicated abstraction that adds no value over the native counterparts.

They will be extracted as an ember addon in case you need to keep using them, but the recommendation now is to just use the native array methods or those in libraries like Underscore/Lodash.
