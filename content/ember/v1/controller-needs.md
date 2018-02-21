---
id: controller-needs
title: Controller.needs
until: ''
since: '1.13'
---

`needs` for controllers will be removed in Ember 2.0. You can migrate away from this using `Ember.inject.controller`.

Lets say you have a `post` controller like this:

```javascript
import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['comments'],
  newComments: Ember.computed.alias('controllers.comments.newest')
});
```

You can upgrade to `Ember.inject.controller` like this:

```javascript
import Ember from 'ember';

export default Ember.Controller.extend({
  comments: Ember.inject.controller(),
  newComments: Ember.computed.alias('comments.newest')
});
```

You can [read more about Ember.inject.controller in the Ember API documentation](http://emberjs.com/api/classes/Ember.inject.html#method_controller).
