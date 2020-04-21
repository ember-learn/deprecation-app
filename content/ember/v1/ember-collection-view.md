---
id: ember-collectionview
title: Ember.CollectionView
until: ''
since: '1.13'
---

`Ember.CollectionView` is deprecated as a consequence of the deprecation of `Ember.View`.

Legacy support of `Ember.CollectionView` will be provided via the [ember-legacy-views](https://github.com/emberjs/ember-legacy-views) addon.

#### Migrating away from `Ember.CollectionView`

In most cases collection view can be replaced using the `{{each}}` helper in combination with the `{{component}}` helper.

To be able to programmatically decide which component to use for an item, you can use a `Ember.Helper`

```javascript {data-filename=app/helpers/animal-component.js}
import Ember from 'ember';

export default Ember.Helper.extend({
  compute: function(params, hash) {
    var type = params[0];
    return type + '-component';
  }
});
```

Then if you have these two components:

```handlebars {data-filename=app/templates/components/dog-component.hbs}
{{animal.name}} is a dog!
```

```handlebars {data-filename=app/templates/components/cat-component.hbs}
{{animal.name}} is a cat!
```

Then you can render your different animals like this:

```javascript {data-filename=app/controllers/animals.js}
import Ember from 'ember';

export default Ember.Controller.extend({
  animals: [
    { type: 'cat', name: 'Buttons' },
    { type: 'dog', name: 'Fido'}
  ]
});
```

```handlebars {data-filename=app/templates/animals.hbs}
<ul>
{{#each animals as |animal|}}
  <li>
    {{component (animal-component animal.type) animal=animal}}
  </li>
{{else}}
  You have no animals.
{{/each}}
</ul>
```

You can [view and manipulate this example on jsbin](http://emberjs.jsbin.com/qegikoliri/1/edit?html,js,output).
