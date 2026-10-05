---
title: 'ProxyMixin'
until: 8.0.0
since: 7.4.0
---

`ProxyMixin`, exported as `_ProxyMixin` from `@ember/-internals/runtime`, is deprecated. This mixin was private but since it may have been used we have added a deprecation as a courtesy through the next LTS.

`ProxyMixin` is what gives [`ObjectProxy`](/id/deprecate-object-proxy) its behavior: every property not defined on the proxy is forwarded to `content`. Applying the mixin directly to another `EmberObject` subclass is deprecated along with `ObjectProxy` itself.

### Before

```javascript
import EmberObject from '@ember/object';
import { _ProxyMixin } from '@ember/-internals/runtime';

export default class Draft extends EmberObject.extend(_ProxyMixin) {
  isDraft = true;
}

let draft = Draft.create({ content: { title: 'Hello' } });

draft.get('title'); // 'Hello'
draft.isDraft; // true
```

### After

Most uses only need the wrapped object plus a few extra fields. Hold the object in a tracked property and read through it:

```javascript
import { tracked } from '@glimmer/tracking';

export default class Draft {
  @tracked content;
  isDraft = true;

  constructor(content) {
    this.content = content;
  }

  get title() {
    return this.content.title;
  }
}

let draft = new Draft({ title: 'Hello' });

draft.title; // 'Hello'
draft.isDraft; // true
```

When the forwarded property set is open-ended, a native `Proxy` covers the same ground. Refer to the [`ObjectProxy` deprecation](/id/deprecate-object-proxy) for that pattern and for `unknownProperty` replacements.

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
