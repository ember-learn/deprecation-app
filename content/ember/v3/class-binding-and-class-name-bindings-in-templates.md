---
id: class-binding-and-class-name-bindings-in-templates
title: "classBinding and classNameBindings as args in templates"
until: '4.0.0'
since: '3.26'
---

`classBinding` and `classNameBindings` can currently be passed as arguments to
components that are invoked with curly invocation. These allow users to
conditionally bind values to the `class` argument using a microsyntax similar to
the one that can be defined in a Classic component's class body:

```js
import Component from '@ember/component';

export default Component.extend({
  classNameBindings: ['isValid:is-valid:is-invalid']
});
```

```handlebars
{{my-component classNameBindings="isValid:is-valid:is-invalid"}}
```

Each binding is a triplet separated by colons. The first identifier in the
triplet is the value that the class name should be bound to, the second
identifier is the name of the class to add if the bound value is truthy, and the
third value is the name to bind if the value is falsy.

These bindings are additive - they add to the existing bindings that are on the
class, rather than replacing them. Multiple bindings can also be passed in by
separating them with a space:

```handlebars
{{my-component
  classBinding="foo:bar"
  classNameBindings="some.boundProperty isValid:is-valid:is-invalid"
}}
```


These bindings can be converted into passing a concatenated string into the
class argument of the component, using inline `if` to reproduce the same
behavior. This is most conveniently done by converting the component to use
angle-bracket invocation at the same time.

Before:

```handlebars
{{my-component
  classBinding="foo:bar"
  classNameBindings="some.boundProperty isValid:is-valid:is-invalid"
}}
```

After:

```handlebars
<MyComponent
  class="
    {{if this.foo "bar"}}
    {{if this.some.boundProperty "bound-property"}}
    {{if this.isValid "is-valid" "is-invalid"}}
  "
>
```

Note that we are passing in the `class` attribute, not the `class` argument. In
most cases, this should work exactly the same as previously. If you referenced
the `class` argument inside of your component, however, you will need to pass
`@class` instead.

If you do not want to convert to angle bracket syntax for some reason, the same
thing can be accomplished with the `(concat)` helper in curly invocation.

```handlebars
{{my-component
  class=(concat
    (if this.foo "bar")
    " "
    (if this.some.boundProperty "bound-property")
    " "
    (if this.isValid "is-valid" "is-invalid")
  )
}}
```
