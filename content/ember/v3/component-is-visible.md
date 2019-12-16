---
id: ember-component.is-visible
title: Deprecate `Component#isVisible`
until: '4.0.0'
since: '3.15'
---

We are deprecating usage of the `isVisible` in classic components in accordance with [RFC #324](https://github.com/emberjs/rfcs/blob/master/text/0324-deprecate-component-isvisible.md).

Instead of setting the `isVisible` property on classic components, consider either using a wrapping `{{#if}}` or the [`hidden` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden):

```hbs
{{! wrapping `if` }}
{{#if this.showComponent}}
  <MyComponent />
{{/if}}

{{! `hidden` attribute }}
<div hidden={{this.isHidden}}></div>
```

