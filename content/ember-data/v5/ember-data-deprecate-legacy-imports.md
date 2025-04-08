---
title: Legacy Imports
until: '6.0'
since: '5.3'
displayId: ember-data:deprecate-legacy-imports
rfc: https://rfcs.emberjs.com/id/0743-ember-data-deprecate-legacy-imports
---

Deprecates importing from `ember-data/*` instead of `@ember-data/*` in order to prepare for the eventual removal of the legacy `ember-data/*`

All imports from `ember-data/*` should be updated to `@ember-data/*` except for `ember-data/store`. When you are using `ember-data` (as opposed to installing the individual packages) you should import from `ember-data/store` instead of `@ember-data/store` in order to receive the appropriate configuration of defaults.

<!-- TODO: gather list of imports that need to be updated -->

This deprecation was introduced in RFC [#0743](https://rfcs.emberjs.com/id/0743-ember-data-deprecate-legacy-imports).