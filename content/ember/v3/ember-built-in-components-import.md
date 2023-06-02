---
title: Importing Legacy Built-in Components
until: 4.0.0
since: "3.27"
displayId: ember.built-in-components.import
---


Historically, the implementation classes of the built-in components `<Input>`,
`<Textarea>` and `<LinkTo>` were made available publicly. This is sometimes
used to customize the appearance or behavior of these components by subclassing
or reopening these classes.

Since Ember 3.27, the built-in components are no longer based on these legacy
classes and the implementation details are no longer public. Therefore, these
legacy classes have been deprecated and will be removed after Ember 4.0.0.

In order to ease migration for apps that have implemented custom components by
subclassing these legacy classes, they will be moved to a legacy addon and
remain "frozen" in there:

* `Checkbox`: `import { Checkbox } from '@ember/legacy-built-in-components';`
* `TextField`: `import { TextField } from '@ember/legacy-built-in-components';`
* `TextArea`: `import { TextArea } from '@ember/legacy-built-in-components';`
* `LinkComponent`: `import { LinkComponent } from '@ember/legacy-built-in-components';`

Before:

```js
// app/components/my-checkbox.js

import Checkbox from '@ember/component/checkbox';
//                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Using Ember.Checkbox or importing from '@ember/component/checkbox' has been
// deprecated, install the `@ember/legacy-built-in-components` addon and use
// `import { Checkbox } from '@ember/legacy-built-in-components';` instead.

export class MyCheckbox extends Checkbox {
  // ...
}
```

After:

```js
// app/components/my-checkbox.js

import { Checkbox } from '@ember/legacy-built-in-components';

export class MyCheckbox extends Checkbox {
  // ...
}
```

Likewise, accessing `Ember.Checkbox`, `Ember.TextField`, `Ember.TextArea` or
`Ember.LinkComponent` will also trigger the same deprecation.

Note that there are a few caveats with using this legacy addon.

First, these legacy classes are considered "frozen" and will not receive any
improvements or bug fixes going forward. In the future, their functionalities
and API may diverge from the built-in components in Ember.

Second, the current implementation of Ember's built-in components are no longer
based on these legacy classes. Therefore, reopening these classes imported from
the addon will not have a any effect on the built-in components. See also [the
section on reopening built-in components](#toc_ember-built-in-components-reopen).

The legacy addon is intended as a stopgap solution to avoid introducing hard
blockers on upgrading to the latest version. It is strongly recommended that
apps migrate away from the legacy patterns as soon as possible.

One alternative would be to create wrapper components that invoke the built-in
components, rather than subclassing them directly.

Note that the `TextSupport` and `TargetActionSupport` mixins have also been
deprecated. These mixins were used to share code among the built-in components.
This was always considered a private implementation detail and the mixins were
documented as private APIs. These private mixins are not available from the
legacy addon and will be removed after Ember 4.0.0.

See [RFC #671](https://emberjs.github.io/rfcs/0671-modernize-built-in-components-1.html)
and [RFC #707](https://emberjs.github.io/rfcs/0707-modernize-built-in-components-2.html)
for more details about this change.
