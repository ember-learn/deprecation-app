---
title: Non Strict Types
until: '6.0'
since: '5.3'
displayId: ember-data:deprecate-non-strict-types
rfc: https://rfcs.emberjs.com/id/0740-ember-data-deprecate-non-strict-types
---

Currently, EmberData expects that the `type` property associated with a resource follows several conventions.

- The `type` property must be a non-empty string
- The `type` property must be singular
- The `type` property must be dasherized

We are deprecating support for types that do not match this pattern in order to unlock future improvements in which we can support `type` being any string of your choosing.

The goal is that in the future, you will be able to use any string so long as it matches what your configured cache, identifier generation, and schemas expect.

E.G. It will matter not that your string is in a specific format like singular, dasherized, etc. so long as everywhere you refer to the type you use the same string.

If using @ember-data/model, there will always be a restriction that the `type` must match the path on disk where the model is defined.

e.g. `app/models/foo/bar-bem.js` must have a type of `foo/bar-bem`

This deprecation was introduced in RFC [#0740](https://rfcs.emberjs.com/id/0740-ember-data-deprecate-non-strict-types).