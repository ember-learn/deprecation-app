---
id: using-code-this-get-template-code
title: Using `this.get('template')`
until: ''
since: '1.13'
---

Prior to 1.13, developers had to check for the existance of the internal `template` property to determine the existance of a yielded block.
This is being deprecated in favor of using the new [hasBlock](http://emberjs.com/api/classes/Ember.Component.html#property_hasBlock)
property within your templates.

#### Determining if a block has been provided from JavaScript

Currently the `hasBlock` property is not made available from the JavaScript component object,
so there is no clean alternative for checking whether a block has been passed.
See the [JavaScript hasBlock RFC](https://github.com/emberjs/rfcs/pull/102) for discussion on making this information
available in the future, as well as possible workarounds.
