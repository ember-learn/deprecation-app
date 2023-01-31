---
id: ember-string.from-ember-module
title: Using Ember.String instead of @ember/string
until: '5.0.0'
since: '4.10.0'
---

Using `Ember.String` instead of importing from `@ember/string` is deprecated.

Before:

```js
import Ember from 'ember';

Ember.String.dasherize('myString'); // 'my-string'
```

After:

```js
import { dasherize } from '@ember/string';

dasherize('myString'); // 'my-string'
```

Also please note that the `@ember/string` package is being moved to an addon,
`@ember/string`. See [this deprecation guide](https://deprecations.emberjs.com/v4.x#toc_ember-string-add-package).

If you were using `htmlSafe` or `isHTMLSafe` off of `Ember.String`, please
import them from `@ember/template` instead. See
[this deprecation guide](https://deprecations.emberjs.com/v3.x#toc_ember-string-htmlsafe-ishtmlsafe) for more information.
