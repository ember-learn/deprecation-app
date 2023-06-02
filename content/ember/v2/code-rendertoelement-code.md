---
id: code-rendertoelement-code
title: renderToElement
until: '2.12.0'
since: '2.11'
---

Using the `renderToElement` is deprecated in favor of `appendTo`.
Please refactor to use `appendTo`:

For example, if you had:

```javascript
component.renderToElement('div');
```

Would be refactored to:

```javascript
let element = document.createElement('div');
component.appendTo(element);
```

Note that both APIs are private, so no public API is being deprecated here.
