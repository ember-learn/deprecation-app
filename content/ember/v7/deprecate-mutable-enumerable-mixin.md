---
title: 'MutableEnumerable mixin'
until: 7.9.0
since: 7.4.0
---

`MutableEnumerable` from `@ember/enumerable/mutable` is deprecated. This mixin was private but since it may have been used we have added a deprecation as a courtesy through the next LTS.

Like `Enumerable`, this mixin has been empty for a long time and was kept only so `.detect()` checks kept working. The migration is the same as for [`Enumerable`](/id/deprecate-enumerable-mixin): replace `.detect()` checks with `Array.isArray` or an iterable check, and replace custom collection classes with native arrays or `trackedArray`.

### Before

```javascript
import MutableEnumerable from '@ember/enumerable/mutable';

function clearAll(maybeList) {
  if (MutableEnumerable.detect(maybeList)) {
    maybeList.clear();
  }
}
```

### After

```javascript
function clearAll(maybeList) {
  if (Array.isArray(maybeList)) {
    maybeList.length = 0;
  }
}
```

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
