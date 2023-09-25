---
title: ObjectController
until: ""
since: "1.11"
---


Experienced Ember users have enjoyed the use of proxying behavior in
the `Ember.ObjectController` class since 1.0. However, this behavior
will be removed in Ember 2.0 as the framework migrates to routable components.

New users hit three road bumps when learning about the object controller pattern.

* Given a certain model, which of the three controller options should I be using?
* Which controller is generated by the framework if I do not specify one?
* When using an object controller, why should the `this` context not be passed
  to actions if it has the properties of my model?

For these reasons, the [Road to Ember 2.0 RFC](https://github.com/emberjs/rfcs/pull/15)
listed object controllers as a concept to be removed from the framework.

To migrate from an explicitly defined object controller, first convert
the class definition to inherit from `Ember.Controller`. For example:

```javascript
import Ember from "ember";

// Change:
export default Ember.ObjectController.extend({
// To:
export default Ember.Controller.extend({

// ...
```

Next update any use of `{{modelPropertyName}}` in templates with `{{model.modelPropertyName}}`.
You should also review any computed property dependent keys, observer keys, and `get` and `set`
statements on the route and controller. An example of how to make this migration can
be found [in this PR to the Ghost project](https://github.com/TryGhost/Ghost/pull/4748).

If a controller is not explicitly defined, but instead is being auto-generated
by the framework, it will only throw a deprecation message if the proxying
behavior is being used.

Added in [PR #10062](https://github.com/emberjs/ember.js/pull/10062).