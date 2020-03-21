---
id: arraycontroller
title: ArrayController
until: ''
since: '1.13'
---

Just like `Ember.ObjectController`, `Ember.ArrayController` will be removed in
Ember 2.0 for the same reasons mentioned in [1.11's ObjectController
deprecation](http://emberjs.com/deprecations/v1.x/#toc_objectcontroller).

To migrate from an explicitly defined array controller, first convert
the class definition to inherit from `Ember.Controller`.

Before:

```javascript
import Ember from "ember";

export default Ember.ArrayController.extend({
});
```

After:

```javascript
import Ember from "ember";

export default Ember.Controller.extend({
});
```

Next update any use of `{{modelPropertyName}}` in templates with `{{model.modelPropertyName}}`.
You should also review any computed property dependent keys, observer keys, and `get` and `set`
statements on the route and controller. An example of how to make this migration can
be found [in this PR to the Ghost project](https://github.com/TryGhost/Ghost/pull/5468).

Opposite to [1.11's ObjectController deprecation](http://emberjs.com/deprecations/v1.x/#toc_objectcontroller),
if a controller is not explicitly defined, but instead is being auto-generated
by the framework, it will **not** throw a deprecation message even if the
proxying behavior is being used.

Added in [PR #11476](https://github.com/emberjs/ember.js/pull/11476).