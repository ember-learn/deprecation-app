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

Note! As of May 19, 2023 there is a [bug](https://github.com/emberjs/ember.js/issues/20377) 
in the implementation of the `@ember/string` deprecation. Adding `@ember/string` 
to your project may not be enough to silence the deprecation. You may silence 
the deprecation by using [`ember-cli-deprecation-workflow`](https://github.com/mixonic/ember-cli-deprecation-workflow). 

To upgrade to `ember-source v5.0`, ensure that `@ember/string` has been added
to your project, and even if you still see this deprecation warning on `v4.x`, imports from
`@ember/string` will continue to work and no longer display a deprecation warning
once on `v5.x`.
