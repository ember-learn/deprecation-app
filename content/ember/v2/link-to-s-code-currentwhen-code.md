---
id: link-to-s-code-currentwhen-code
title: Link-to's `currentWhen`
until: '3.0.0'
since: '2.0'
---

When developers wanted to customize in what route a `{{link-to}}` should be considered "active" they
could pass it using `currentWhen`.

```handlebars
{{#link-to 'item' currentWhen='index'}}
```

Now `currentWhen` is deprecated in favour of the hyphenated `current-when`, with the exact
same semantics:

```handlebars
{{#link-to 'item' current-when='index'}}
```
