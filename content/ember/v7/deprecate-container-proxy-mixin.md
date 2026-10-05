---
title: 'ContainerProxyMixin'
until: 7.9.0
since: 7.4.0
---

`ContainerProxyMixin` from `@ember/-internals/runtime` is deprecated. This mixin was private but since it may have been used we have added a deprecation as a courtesy through the next LTS.

There is no migration for applying the mixin yourself. Remove it. If you built a custom object that forwarded to a container, look up what you need through the owner instead:

```javascript
import { getOwner } from '@ember/owner';

class ThemeLoader {
  constructor(owner) {
    this.owner = owner;
  }

  load(name) {
    return this.owner.lookup(`theme:${name}`);
  }
}

// from anywhere with an owner
let loader = new ThemeLoader(getOwner(this));
```

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
