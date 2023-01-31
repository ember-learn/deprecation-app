---
id: ember-string.add-package
title: Importing from @ember/string without @ember/string as a dependency
until: '5.0.0'
since: '4.10.0'
---

Importing from `@ember/string` without the `@ember/string` package as a
dependency is deprecated.

The `@ember/string` package is being moved to an addon `@ember/string`.

To add the package to your project:

```bash
  ember install @ember/string
```

If you were importing `htmlSafe` or `isHTMLSafe` from `@ember/string`, please
import them from `@ember/template` instead. See
[this deprecation guide](https://deprecations.emberjs.com/v3.x#toc_ember-string-htmlsafe-ishtmlsafe) for more information.
