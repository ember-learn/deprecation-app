---
id: model-param-in-code-render-code-helper
title: Model param in render helper
until: '3.0.0'
since: '2.6'
---

Using the model param in the `{{render` helper is deprecated in favor of using
components. Please refactor to a component and invoke thusly:

For example, if you had:

```handlebars
{{render 'foo-bar' someModel}}
```

```handlebars {data-filename=app/templates/foo-bar.hbs}
<p>{{someProp}} template stuff here</p>
```

```javascript {data-filename=app/controllers/foo-bar.js}
export default Controller.extend({
  someProp: Ember.computed('model.yolo', function() {
    return this.get('model.yolo');
  })
});
```

Would be refactored to:

```handlebars
{{foo-bar model=someModel}}
```

```handlebars {app/templates/components/foo-bar.hbs}
<p>{{someProp}} template stuff here</p>
```

```javascript {app/components/foo-bar.js}
export default Component.extend({
  someProp: Ember.computed('model.yolo', function() {
    return this.get('model.yolo');
  })
});
```
