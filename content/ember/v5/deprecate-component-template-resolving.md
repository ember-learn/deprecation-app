---
title: Component Template Resolving 
until: 6.0.0
since: 5.10.0
---

There are two types of paths to migrate off the old layouts 
- use a currently supported multi-file layout (keeping separate `js`, `ts`, and `hbs` files)
- migrate the component entirely to the latest component format, `gjs`, `gts`, (aka `<template>`)

There are some tools to help with this:
- [Classic to Colocation](https://github.com/ember-codemods/ember-component-template-colocation-migrator)
- [Convert pods to Colocation](https://github.com/ijlee2/ember-codemod-pod-to-octane)

Specifically, these layouts are no longer supported:

<table style="width:100%"><thead><tr><th>Classic</th><th>Pods</th></thead>
<tbody><tr><td style="vertical-align:top; width:50%;">

```
{app,addon}/
  components/
    foo.js
    namespace/
      bar.js
  templates/
    components/
      foo.hbs
      namespace/
        bar.hbs
```

</td><td style="vertical-align:top">

```
{app,addon}/
  components/
    foo/
      component.js
      template.hbs
    namespace/
      bar/
        component.js
        template.hbs
```

</td></tr></tbody>
</table>


The above example(s) can be migrated to:

```
{app,addon}/
  components/
    foo.js 
    foo.hbs
    namespace/
      bar.js
      bar.hbs
```

Or using `--component-structure=nested`

```
{app,addon}/
  components/
    foo/
      index.js 
      index.hbs
    namespace/
      bar/
        index.js
        index.hbs
```

Note, however, that classic components _importing_ the `layout` and setting it on an `@ember/component` will still work.
The key thing being deprecated is the runtime resolution of templates, so if there is an import involved, there is no runtime resolution.
