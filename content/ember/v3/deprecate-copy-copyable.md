---
id: ember-runtime.deprecate-copy-copyable
title: Use ember-copy addon instead of copy method and Copyable mixin.
until: '4.0.0'
since: '3.3'
---

Since Ember's earliest days, the `copy` function and `Copyable` mixin from `@ember/object/internals` were intended to be treated as an Ember internal mechanism. The `Copyable` mixin, in particular, has always been marked private, and it is required in order to use `copy` with any Ember `Object`-derived class without receiving an assertion. 

`Copyable` hasn't been used by any code inside of Ember for a very long time -- except  the `NativeArray` mixin, inherited by Ember arrays. The deprecated `copy` function now handles array copies directly, no longer delegating to `NativeArray.copy`. With this deprecation, `NativeArray` no longer inherits from `Copyable` and the `copy` method of `NativeArray` is also now deprecated.  

For shallow copies of data where you use `copy(x)` or `copy(x, false)`, you can use the ES6 `Object.assign({}, x)` to get the desired effect. For deep copies, `copy(x, true)`, the most efficient and concise approach varies with the situation, but several options are available in open source.

For those whose code has become dependent upon the existing implementation,  `copy` and `Copyable`  have been extracted to the `ember-copy` addon . For the most part, you will only need to adjust your `import` statements to use the methods from  `ember-copy` instead of `@ember/object/internals` and things should work identically. However, if your code explicitly calls  `myArray.copy()` method, you must also adjust your code to call  `copy(myArray)`. 
