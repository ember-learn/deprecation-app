---
id: ember.built-in-components.legacy-arguments
title: Built-in Components Legacy Arguments
until: '4.0.0'
since: '3.27'
---

As of Ember 3.27, these are the named arguments API of the built-in components:

* `<LinkTo>`
  * `@route`
  * `@model`
  * `@models`
  * `@query`
  * `@replace`
  * `@disabled`
  * `@current-when`
  * `@activeClass`
  * `@loadingClass`
  * `@disabledClass`
* `<Input>`
  * `@type`
  * `@value`
  * `@checked`
  * `@insert-newline`
  * `@enter`
  * `@escape-press`
* `<Textarea>`
  * `@value`
  * `@insert-newline`
  * `@enter`
  * `@escape-press`

In order to reduce their API surfaces, all other arguments on these components
have been deprecated. The arguments not enumerated above are either no longer
necessary, no longer recommended or accidentally exposed private implementation
details.

### No Longer Necessary

#### HTML Attributes and DOM Events

See the dedicated section on [Legacy HTML Attribute Arguments](#toc_ember-built-in-components-legacy-attribute-arguments).

### No Longer Recommended

#### Changing `@tagName` on `<LinkTo>`

Due to the classic component implementation heritage, the built-in components
historically accepted a `@tagName` argument that allows customizing the tag
name of the underlying HTML element.

This was once popular with the `<LinkTo>` component for adding navigation
behavior to buttons, table row and other UI elements. The current consensus is
that this is an anti-pattern and causes issues with assistive technologies.

In most cases, the `<a>` anchor HTML element should be used for navigational UI
elements and styled with CSS to fit with the design requirements. Ocasionally,
a button may be acceptable, in which case a custom event handler can be written
using the router service and attached using the `{{on}}` modifier.

Other edge cases exist, but generally those solutions can be adapted to fulfill
the requirements. For example, to make a table row clickable as a convenience,
the primary column can be made into a link, while a click event handler is
attached to the table row to redispatch the click to trigger the link.

Since this feature is no longer recommended, invoking `<LinkTo>` with the
`@tagName` argument is now deprecated:

```hbs
<LinkTo @tagName="div" ...>...</LinkTo>
        ~~~~~~~~~~~~~~
or

{{#link-to tagName="div" ...}}...{{/link-to}}
           ~~~~~~~~~~~~~

Passing the `@tagName` argument to <LinkTo> is deprecated. Using a <div>
element for navigation is not recommended as it creates issues with assistive
technologies. Remove this argument to use the default <a> element. In the rare
cases that call for using a different element, refactor to use the router
service inside a custom event handler instead.
```

As a temporary measure to maintain compatibility, when Ember detects that the
`@tagName` argument is passed to the `<LinkTo>` component, it will revert that
invocation to the legacy implementation while issuing the deprecation. This is
intended as a stopgap measure to avoid introducing hard blockers on upgrading
to the latest version. It is strongly recommended that apps migrate away from
the legacy patterns as soon as possible.

Due to implementation differences, the legacy implementations may be less
performant and have subtle differences in behavior, especially in edge cases
around undocumented or deprecated functionalities. This temporary measure will
stop working afer Ember 4.0.0.

With the ability to modify `@tagName` deprecated, the previously private
`@eventName` and `@preventDefault` arguments on `<LinkTo>` are deprecated as
well. These arguments were occasionally useful when the element is something
other than an `<a>` element, but in the case of an `<a>` element, the default
browser action is to navigate to the `href` via a full-page refresh. If that is
not prevented, it would defeat the purpose of using the `<LinkTo>` component.

Similarly, the `@bubbles` argument is deprecated as well as `stopPropagation()`
is not automatically called, so there is no need to pass this argument when that
is the desired behavior. On the other hand, if it is desirable to stop event
propagation, a custom event handler can be attached using the `{{on}}` modifier.

Note that while the `<Input>` and `<Textarea>` components also accepted the
`@tagName` argument, it was never supported and its behavior is undefined. This
may stop "working" at any point without warning and should not be relied upon.

### Other Unsupported Arguments

Other named arguments not explicitly mentioned above are considered private
implementation details. Due to the nature of classic components' arguments
being set on its instance, any internal properties and methods could have been
clobbered by a named argument with the same name.

Some examples include private properties like `@active` and `@loading` on
`<LinkTo>`, `@bubbles` and `@cancel` on `<Input>` and `<Textarea>`, lifecycle
hooks inherited from the classic component super class like `@didRender`,
`@willDestroy` and so on.

Clobbering these internal properties and methods cause the components to behave
in unexpected ways. This should be considered a bug and should not be relied
upon. Any accidental difference in behavior caused by passing these unsupported
named arguments may stop at any time without warning.

As a temporary measure to maintain compatibility, when Ember detects that an
unknown argument is passed to a built-in component, it will revert that
invocation to the legacy implementation while issuing an deprecation. This is
intended as a stopgap measure to avoid introducing hard blockers on upgrading
to the latest version. It is strongly recommended that apps migrate away from
the legacy patterns as soon as possible. This temporary measure will stop
working after Ember 4.0.0.

See [RFC #671](https://emberjs.github.io/rfcs/0671-modernize-built-in-components-1.html)
and [RFC #707](https://emberjs.github.io/rfcs/0707-modernize-built-in-components-2.html)
for more details about this change.
