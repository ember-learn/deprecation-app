---
title: Non Strict Id
until: 6.0.0
since: 5.3.0
displayId: ember-data:deprecate-non-strict-id
---

Currently, EmberData expects that the `id` property associated with a resource is a string.

However, for legacy support in many locations we would accept a number which would then immediately be coerced into a string.

We are deprecating this legacy support for numeric IDs.

The goal is that in the future, you will be able to use any ID format so long as everywhere you refer to the ID you use the same format.

However, for identifiers we will always use string IDs and so any custom identifier configuration should provide a string ID.
