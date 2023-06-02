---
id: ember-containerview
title: Ember.ContainerView
until: ''
since: '1.13'
---

`Ember.ContainerView` is deprecated as a consequence of the deprecation of `Ember.View`.

Legacy support of `Ember.ContainerView` will be provided via the [ember-legacy-views](https://github.com/emberjs/ember-legacy-views) addon.

#### Migrating away from `Ember.ContainerView`

In most cases container view can be replaced using the `{{each}}` helper in combination with the `{{component}}` helper.

```javascript {data-filename=app/components/component-container.js}
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['the-container'],
  childComponents: ['a-component', 'b-component']
})
```

```handlebars {data-filename=app/templates/components/component-container.hbs}
{{#each childComponents as |childComponent|}}
  {{component childComponent}}
{{/each}}
```