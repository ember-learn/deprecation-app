---
id: record-lifecycle-event-methods
title: Record Lifecycle Event Methods
until: '4.0.0'
since: '3.12.0'
---
#### Deprecating Record Lifecycle Event Methods
As described in ['RFC 0329'](https://github.com/emberjs/rfcs/pull/329) -
>...the following lifecycle methods on DS.Model will also be deprecated: becameError, becameInvalid, didCreate, didDelete, didLoad, didUpdate, ready, rolledBack.
>
> When a model is instantiated for the first time with any of these methods a deprecation warning will be logged notifiying the user that this method will be deprecated and the user should use an computed or overide the model's init method instead.

The work of lifecycle events can be achieved with a computed property on a relevant property or kick off additional work when performing the operation.

#### Some Examples of CP Alternatives:
* **becameError** - CP on [isError](https://api.emberjs.com/ember-data/3.10/classes/DS.Model/properties/isError?anchor=isError)
* **becameInvalid** - CP on [isValid](https://api.emberjs.com/ember-data/3.10/classes/DS.Model/properties/isValid?anchor=isValid)
* **didCreate** - CP on [isNew](https://api.emberjs.com/ember-data/3.10/classes/DS.Model/properties/isNew?anchor=isNew)
* **didDelete** - CP on [isDeleted](https://api.emberjs.com/ember-data/3.10/classes/DS.Model/properties/isDeleted?anchor=isDeleted)
* **didLoad** - CP on [isLoaded](https://api.emberjs.com/ember-data/3.10/classes/DS.Model/properties/isLoaded?anchor=isLoaded)
* **didUpdate** - CP on [hasDirtyAttributes](https://api.emberjs.com/ember-data/3.10/classes/DS.Model/properties/hasDirtyAttributes?anchor=hasDirtyAttributes)

Other workarounds can be done at the time of interacting with the model.
For example, the following could be an alternative to using the `didLoad` event.

```javascript
store.findRecord('model', 1).then(function(model) {
  performModelLoadedTask(model);
});
```
