---
id: attrs-arg-access
title: "Accessing named args via {{attrs}}"
until: '4.0.0'
since: '3.26'
---

The `{{attrs}}` object was an alternative way to reference named arguments in
templates that was introduced prior to named arguments syntax being finalized.
References to properties on `{{attrs}}` can be converted directly to named
argument syntax.

Before:

```hbs
{{attrs.foo}}
{{this.attrs.foo.bar}}
{{deeply (nested attrs.foobar.baz)}}
```

After:

```hbs
 {{@foo}}
 {{@foo.bar}}
 {{deeply (nested @foobar.baz)}}
 ```
