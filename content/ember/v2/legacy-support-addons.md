---
id: legacy-support-addons
title: Legacy support addons
until: '3.0.0'
since: '2.6'
---

Ember provides addons [ember-legacy-views](https://github.com/emberjs/ember-legacy-views) and
[ember-legacy-controllers](https://github.com/emberjs/ember-legacy-controllers) that allow for projects to continue
using some legacy concepts in 2.x.
Beginning in 2.4, use of these addons is now deprecated.

See the deprecation guide sections on [removing views](http://emberjs.com/deprecations/v1.x/#toc_ember-view),
[`ArrayController`](http://emberjs.com/deprecations/v1.x/#toc_arraycontroller),
and [`ObjectController`](http://emberjs.com/deprecations/v1.x/#toc_objectcontroller)
for information on migration.

Once view and controller deprecations are removed, you can remove the addons with the command:
`npm uninstall --save-dev ember-legacy-views && npm uninstall ember-legacy-controllers`
