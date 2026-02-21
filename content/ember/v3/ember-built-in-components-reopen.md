---
title: Reopening Legacy Built-in Components
until: 4.0.0
since: 3.27.0
displayId: ember.built-in-components.reopen
---


Historically, the implementation classes of the built-in components `<Input>`,
`<Textarea>` and `<LinkTo>` were made available publicly. This is sometimes
used to customize the apperances or behavior of these components by subclassing
or reopening these classes.

Since Ember 3.27, the built-in components are no longer based on these legacy
classes and the implementation details are no longer public. After 4.0.0, it
will not be possible to reopen the built-in components.

As a temporary measure to maintain compatibility, when Ember detects that a
built-in component is reopened, it will revert that component to its legacy
implementation while issuing a deprecation. This is intended as a stopgap
measure to avoid introducing hard blockers on upgrading to the latest version.
It is strongly recommended that apps migrate away from the legacy patterns as
soon as possible.

Due to implementation differences, the legacy implementations may be less
performant and have subtle differences in behavior, especially in edge cases
around undocumented or deprecated functionailities. This temporary measure will
stop working afer Ember 4.0.0.

One alternative would be to create wrapper components that invokes the built-in
components, rather than subclassing them directly.

Before:

```js
Checkbox.reopen({
//      ~~~~~~~
// Reopening Ember.Checkbox has been deprecated. Consider implementing your own
// wrapper component or create a custom subclass.
  attributeBindings: ['metadata:data-my-metadata'],
  metadata: ''
});
```

After:

```handlebars
{{!-- app/components/my-checkbox.hbs --}}

<Input
  @type="checkbox"
  @checked={{@checked}}
  ...attributes
  data-my-metadata={{@metadata}}
/>
```

Likewise, calling `reopenClass` on these built-in components will also trigger
the same deprecation.

Alternatively, you may also implement your own customized version of the
component installing the `@ember/legacy-built-in-components` addon. This addon
vendors the legacy classes and make them available for subclassing.

Before:

```js
Checkbox.reopen({
//      ~~~~~~~
// Reopening Ember.Checkbox has been deprecated. Consider implementing your own
// wrapper component or create a custom subclass.
  change(...args) {
    console.log('changed');
    this._super(...args);
  }
});
```

After:

```js {data-filename=app/components/my-checkbox.js}
import { Checkbox } from '@ember/legacy-built-in-components';

export default class MyCheckbox extends Checkbox {
  change(...args) {
    console.log('changed');
    super.change(...args);
  }
}
```

Note that this legacy addon merely makes the legacy classes available, it does
not revert the built-in components' implementation to be based on these legacy
classes. You cannot simply reopen the classes provided by this addon.

The legacy addon is only meant to be a stopgap solution. See [the section on
importing built-in components](#toc_ember-built-in-components-import) for more
details.

Finally, because the legacy implementations are based on the classic component
(`Ember.Component` or `import Component from '@ember/component';`) super class,
reopening the classic component super class will revert all built-in components
to their legacy implementations while triggering a deprecation warning. This
temporary measure will stop working afer Ember 4.0.0.

Reopening a the classic component super class is dangerous and has far-reaching
consequences. For example, it may unexpectedly break addons that are not
expecting the changes.

To respond to DOM events globally, consider using global event listeners
instead.

Before:

```js
import Component from '@ember/component';

Component.reopen({
//       ~~~~~~~
// Reopening the Ember.Component super class itself has been deprecated. Consider
// alternatives such as installing event listeners on the document or add the
// customizations to specific subclasses.
  click() {
    console.log('Clicked on a classic component');
  }
});
```

After:

```js
document.addEventListener('click', event => {
  if (e.target.classList.contains('ember-view')) {
    console.log('Clicked on a classic component');
  }
});
```

Alternatively, you may create a custom subclass of `Ember.Component` with the
behavior you want and subclass from that in your app. That way, only those
components which explictly opted into the changes will be affected.

Before:

```js
import Component from '@ember/component';

Component.reopen({
//       ~~~~~~~
// Reopening the Ember.Component super class itself has been deprecated. Consider
// alternatives such as installing event listeners on the document or add the
// customizations to specific subclasses.
  attributeBindings: ['metadata:data-my-metadata'],
  metadata: ''
});
```

After:

```js {data-filename=app/components/base.js}
import Component from '@ember/component';

// Subclass from this in your app, instead of subclassing from Ember.Component
export default Component.extend({
  attributeBindings: ['metadata:data-my-metadata'],
  metadata: ''
});
```

See [RFC #671](https://emberjs.github.io/rfcs/0671-modernize-built-in-components-1.html)
and [RFC #707](https://emberjs.github.io/rfcs/0707-modernize-built-in-components-2.html)
for more details about this change.
