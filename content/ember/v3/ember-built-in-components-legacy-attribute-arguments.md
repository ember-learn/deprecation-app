---
id: ember.built-in-components.legacy-attribute-arguments
title: Built-in Components Legacy HTML Attribute Arguments
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

#### HTML Attributes

The built-in components historically accepted a varierty of named arguments for
applying certain HTML attributes to the component's HTML element. This includes
the following (may not be a complete list):

* `<LinkTo>`
  * `@id`
  * `@elementId` (alias for `@id`)
  * `@ariaRole` (maps to the `role` HTML attribute)
  * `@class`
  * `@classNames` (deprecated, expands into the `class` HTML atttribute)
  * `@classNameBindings` (deprecated, expands to the `class` HTML atttribute)
  * `@isVisible` (deprecated, expands to the `display: none` inline style)
  * `@rel`
  * `@tabindex`
  * `@target`
  * `@title`
* `<Input>`
  * `@id`
  * `@elementId` (alias for `@id`)
  * `@ariaRole` (maps to the `role` HTML attribute)
  * `@class`
  * `@classNames` (deprecated, expands into the `class` HTML atttribute)
  * `@classNameBindings` (deprecated, expands to the `class` HTML atttribute)
  * `@isVisible` (deprecated, expands to the `display: none` inline style)
  * `@accept`
  * `@autocapitalize`
  * `@autocomplete`
  * `@autocorrect`
  * `@autofocus`
  * `@autosave`
  * `@dir`
  * `@disabled`
  * `@form`
  * `@formaction`
  * `@formenctype`
  * `@formmethod`
  * `@formnovalidate`
  * `@formtarget`
  * `@height`
  * `@indeterminate`
  * `@inputmode`
  * `@lang`
  * `@list`
  * `@max`
  * `@maxlength`
  * `@min`
  * `@minlength`
  * `@multiple`
  * `@name`
  * `@pattern`
  * `@placeholder`
  * `@readonly`
  * `@required`
  * `@selectionDirection`
  * `@size`
  * `@spellcheck`
  * `@step`
  * `@tabindex`
  * `@title`
  * `@width`
* `<Textarea>`
  * `@id`
  * `@elementId` (alias for `@id`)
  * `@ariaRole` (maps to the `role` HTML attribute)
  * `@class`
  * `@classNames` (deprecated, expands into the `class` HTML atttribute)
  * `@classNameBindings` (deprecated, expands to the `class` HTML atttribute)
  * `@isVisible` (deprecated, expands to the `display: none` inline style)
  * `@autocapitalize`
  * `@autocomplete`
  * `@autocorrect`
  * `@autofocus`
  * `@cols`
  * `@dir`
  * `@disabled`
  * `@form`
  * `@lang`
  * `@maxlength`
  * `@minlength`
  * `@name`
  * `@placeholder`
  * `@readonly`
  * `@required`
  * `@rows`
  * `@selectionDirection`
  * `@selectionEnd`
  * `@selectionStart`
  * `@spellcheck`
  * `@tabindex`
  * `@title`
  * `@wrap`

These arguments are no longer necessary – with angle bracket invocations, HTML
attributes can be passed directly. An invocation passing one or more of these
named arguments now triggers a deprecation warning.

Before:

```handlebars
<Input @placeholder="Ember.js" />
       ~~~~~~~~~~~~~~~~~~~~~~~
or

{{input placeholder="Ember.js"}}
        ~~~~~~~~~~~~~~~~~~~~~~

Passing the `@placeholder` argument to <Input> is deprecated. Instead, please
pass the attribute directly, i.e. `<Input placeholder={{...}} />` instead of
`<Input @placeholder={{...}} />` or `{{input placeholder=...}}`.
```

After:

```handlebars
<Input placeholder="Ember.js" />
```

A notable exception when passing an argument named `@href` to the `<LinkTo>`
component. This was never intentionally supported and will trigger an error
instead of a deprecation warning.

#### DOM Events

The built-in components historically accepted a variety of named arguments for
listening to certain DOM events on the component's HTML element. This includes
the following (may not be a complete list):

* `<LinkTo>`
  * `@change`
  * `@click`
  * `@contextMenu` (for the `contextmenu` event)
  * `@doubleClick` (for the `dblclick` event)
  * `@drag`
  * `@dragEnd` (for the `dragend` event)
  * `@dragEnter` (for the `dragenter` event)
  * `@dragLeave` (for the `dragleave` event)
  * `@dragOver` (for the `dragover` event)
  * `@dragStart` (for the `dragstart` event)
  * `@drop`
  * `@focusIn` (for the `focusin` event)
  * `@focusOut` (for the `focusout` event)
  * `@input`
  * `@keyDown` (for the `keydown` event)
  * `@keyPress` (for the `keypress` event)
  * `@keyUp` (for the `keyup` event)
  * `@mouseDown` (for the `mousedown` event)
  * `@mouseEnter` (deprecated, for the `mouseenter` event)
  * `@mouseLeave` (deprecated, for the `mouseleave` event)
  * `@mouseMove` (deprecated, for the `mousemove` event)
  * `@mouseUp` (for the `mouseup` event)
  * `@submit`
  * `@touchCancel` (for the `touchcancel` event)
  * `@touchEnd` (for the `touchend` event)
  * `@touchMove` (for the `touchmove` event)
  * `@touchStart` (for the `touchstart` event)
* `<Input>`
  * `@click`
  * `@contextMenu` (for the `contextmenu` event)
  * `@doubleClick` (for the `dblclick` event)
  * `@drag`
  * `@dragEnd` (for the `dragend` event)
  * `@dragEnter` (for the `dragenter` event)
  * `@dragLeave` (for the `dragleave` event)
  * `@dragOver` (for the `dragover` event)
  * `@dragStart` (for the `dragstart` event)
  * `@drop`
  * `@input`
  * `@mouseDown` (for the `mousedown` event)
  * `@mouseEnter` (deprecated, for the `mouseenter` event)
  * `@mouseLeave` (deprecated, for the `mouseleave` event)
  * `@mouseMove` (deprecated, for the `mousemove` event)
  * `@mouseUp` (for the `mouseup` event)
  * `@submit`
  * `@touchCancel` (for the `touchcancel` event)
  * `@touchEnd` (for the `touchend` event)
  * `@touchMove` (for the `touchmove` event)
  * `@touchStart` (for the `touchstart` event)
  * `@focus-in` (for the `focusin` event)
  * `@focus-out` (for the `focusout` event)
  * `@key-down` (for the `keydown` event)
  * `@key-press` (for the `keypress` event)
  * `@key-up` (for the `keyup` event)
* `<Textarea>`
  * `@click`
  * `@contextMenu` (for the `contextmenu` event)
  * `@doubleClick` (for the `dblclick` event)
  * `@drag`
  * `@dragEnd` (for the `dragend` event)
  * `@dragEnter` (for the `dragenter` event)
  * `@dragLeave` (for the `dragleave` event)
  * `@dragOver` (for the `dragover` event)
  * `@dragStart` (for the `dragstart` event)
  * `@drop`
  * `@input`
  * `@mouseDown` (for the `mousedown` event)
  * `@mouseEnter` (deprecated, for the `mouseenter` event)
  * `@mouseLeave` (deprecated, for the `mouseleave` event)
  * `@mouseMove` (deprecated, for the `mousemove` event)
  * `@mouseUp` (for the `mouseup` event)
  * `@submit`
  * `@touchCancel` (for the `touchcancel` event)
  * `@touchEnd` (for the `touchend` event)
  * `@touchMove` (for the `touchmove` event)
  * `@touchStart` (for the `touchstart` event)
  * `@focus-in` (for the `focusin` event)
  * `@focus-out` (for the `focusout` event)
  * `@key-down` (for the `keydown` event)
  * `@key-press` (for the `keypress` event)
  * `@key-up` (for the `keyup` event)

These arguments are no longer necessary – with angle bracket invocations, DOM
event listeners can be registered directly using the `{{on}}` modifier. An
invocation passing one or more of these named arguments now triggers a
deprecation warning.

Before:

```handlebars
<Input @click={{this.onClick}} />
       ~~~~~~~~~~~~~~~~~~~~~~~
or

{{input click=this.onClick}}
        ~~~~~~~~~~~~~~~~~~

Passing the `@click` argument to <Input> is deprecated. Instead, please use the
{{on}} modifier, i.e. `<Input {{on "click" ...}} />` instead of
`<Input @click={{...}} />` or `{{input click=...}}`.
```

After:

```handlebars
<Input {{on "click" this.onClick}} />
```

Note that these named arguments were not necessarily an intentional part of the
component's original design. Rather, these are callbacks that would have fired
on all classic components, and since classic components' arguments are set on
the component instances as properties, passing these arguments at invocation
time would have "clobbered" any callbacks with the same name defined on the
component's class/prototype, whether it was intended by the component's author
or not.

For instance, the `<Input>` and `<Textarea>` built-in components implemented
callbacks that would have been clobbered by these named arguments (may not be a
complete list):

* `@change`
* `@focusIn`
* `@focusOut`
* `@keyDown`
* `@keyPress`
* `@keyUp`

Passing these named arguments historically suppressed certain behavior of the
built-in components, in some cases preventing the components from functioning
properly. This was never an intended part of the original design and should be
considered a bug.

The new implementations are generally more robust against these issues, so that
passing these deprecated arguments no longer clobbers internal methods or
supresses built-in functionalities. This is generally desirable and should be
the expected behavior going forward.

However, apps that passes these arguments should take special care to confirm
they were not inadvertently relying on the built-in functionalities being
suppressed. An invocation with these named arguments now triggers a deprecation
warning with this additional caveat.

Before:

```handlebars
<Input @change={{this.onChange}} />
       ~~~~~~~~~~~~~~~~~~~~~~~~~
or

{{input change=this.onChange}}
        ~~~~~~~~~~~~~~~~~~~~

Passing the `@change` argument to <Input> is deprecated. This would have
overwritten the internal `change` method on the <Input> component and prevented
it from functioning properly. Instead, please use the {{on}} modifier, i.e.
`<Input {{on "change" ...}} />` instead of `<Input @change={{...}} />` or
`{{input change=...}}`.
```

After:

```handlebars
<Input {{on "change" this.onChange}} />
```

### Other Arguments

See the section on [Other Legacy Arguments](#toc_ember-built-in-components-legacy-arguments).

See [RFC #671](https://emberjs.github.io/rfcs/0671-modernize-built-in-components-1.html)
and [RFC #707](https://emberjs.github.io/rfcs/0707-modernize-built-in-components-2.html)
for more details about this change.
