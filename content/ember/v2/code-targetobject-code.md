---
id: code-targetobject-code
title: targetObject
until: '3.5.0'
since: '2.18'
---

The `targetObject` property on `Component` was intended as a "write-only API", meaning that the user was supposed to define their own if they desired, but not read the default one. It was never intended for `this.get('targetObject')` to be used, so it is now deprecated. The recommendation is to use `target` instead.
