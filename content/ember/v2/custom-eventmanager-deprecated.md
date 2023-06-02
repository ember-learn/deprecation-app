---
id: custom-eventmanager-deprecated
title: Custom eventManager deprecated
until: '2.17.0'
since: '2.14'
---

`EventDispatcher` has long supported custom `eventManager`s containing their own
event dispatching rules to be defined on components. This feature was initially
added to allow components to differentiate between certain types of touch input,
however the [addon](https://github.com/emberjs-addons/ember-touch/) that originally
used this has long been deprecated.

If needed, an addon which allows for custom component `eventManager`s can be
created. Please comment on the [original RFC](https://github.com/emberjs/rfcs/pull/194)
if you have a need for this in your app.
