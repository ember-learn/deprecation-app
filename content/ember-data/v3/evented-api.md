---
id: evented-api-usage
title: Evented Api Usage
until: '4.0.0'
since: '3.12.0'
---
As described in ['RFC 0329'](https://github.com/emberjs/rfcs/pull/329) -
> Ember.Evented functionality on DS.Model, DS.ManyArray, DS.Errors, DS.RecordArray, and DS.PromiseManyArray will be deprecated and eventually removed in a future release. This includes the following methods from the Ember.Evented class: has, off, on, one, and trigger.

Any code that relies on these objects using the `Evented` API should be removed. A few scenarios are outlined below.

#### Derived State

**before**

```javascript
class User extends Model {
  @attr() username;

  @on('becameValid', 'becameInvalid')
  updateUsernameAvailability() {
    this.usernameIsAvailable = this.isValid || !this.errors.has('name');
  }
}
```

**after**

```javascript
class User extends Model {
  @attr() username;
  @computed('isValid')
  get usernameIsAvailable() {
    return this.isValid || !this.errors.has('name');
  }
}
```


#### Side-effects Driven by User App Code

**before**

```javascript
class User extends Model {
  @service() tracking;
  @attr() username;

  @on('didDelete')
  trackDeletion() {
     this.tracking.registerDeletion(this);
  }
}
```

**after**
```javascript
userRecord.deleteRecord();
tracking.registerDeletion(userRecord);
```

#### Side-effects Driven by Addon Extensions

Addons that were using these events for managing record state tracking and buffering should consider migrating to providing a custom `RecordData` implementation.
