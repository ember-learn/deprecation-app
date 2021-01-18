---
id: ember-string.htmlsafe-ishtmlsafe
title: Deprecate importing htmlSafe and isHTMLSafe from @ember/string
until: '4.0.0'
since: '3.25'
---

Importing `htmlSafe` and `isHTMLSafe` from `@ember/string` is deprecated.

You should instead import these functions from `@ember/template`.

Before:

```js
import { htmlSafe, isHTMLSafe } from '@ember/string';

let htmlString = "<h1>Hamsters are the best!</h1>";
isHTMLSafe(htmlString); //=> false

let htmlSafeString = htmlSafe(htmlString);
isHTMLSafe(htmlSafeString); //=> true
```

After:

```js
import { htmlSafe, isHTMLSafe } from '@ember/template';

let htmlString = "<h1>Hamsters are the best!</h1>";
isHTMLSafe(htmlString); //=> false

let htmlSafeString = htmlSafe(htmlString);
isHTMLSafe(htmlSafeString); //=> true
```
