---
id: this-property-fallback
title: Property Fallback Lookup
until: '4.0.0'
since: 'Upcoming'
---

It is currently possible to reference properties on a component without a preceding `this`. For instance, this component:

```js
export class MyComponent extends Component {
  name = 'Tomster';
}
```
```handlebars
Hello, {{name}}!
```

Would render the following HTML:

```html
Hello, Tomster!
```

This style of looking up properties is known as "property fallback", and has the potential to collide with other types of values. For instance, if there was a component or helper named `name`, it would be rendered instead of the property. The alternative way to lookup properties is with a preceding `this`:

```handlebars
Hello, {{this.name}}!
```

This style does not have any ambiguity, since it's clear that we're looking up the property on this instance of the component, and not the global helper/component. Property fallback has been deprecated in favor of this style in general.

Note that property fallback can occur anywhere that a property can be referenced. Here are some examples of properties referenced using property fallback:

```handlebars
{{someProp}}
{{my-helper someProp}}
{{if (my-other-helper someProp)}}
{{some.nested.prop}}
<MyComponent @arg={{someProp}} @arg2={{some.nested.prop}} />
```

And here are the same property lookups updated to use `this`:

```handlebars
{{this.someProp}}
{{my-helper this.someProp}}
{{if (my-other-helper this.someProp)}}
{{this.some.nested.prop}}
<MyComponent @arg={{this.someProp}} @arg2={{this.some.nested.prop}} />
```
