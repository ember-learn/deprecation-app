---
id: ember-data:deprecate-errors-hash-to-array-helper
title: Deprecate Errors Hash To Array Helper
until: '5.0'
since: '4.7'
---

Deprecates `errorsHashToArray` `errorsArrayToHash` and `normalizeModelName`.

Users making use of these (already private) utilities can trivially copy them into their own codebase to continue using them, though we recommend refactoring to a more direct conversion into the expected errors format for the errors helpers.

For refactoring normalizeModelName we also recommend following the guidance in [RFC#740 Deprecate Non-Strict Types](https://github.com/emberjs/rfcs/pull/740).
