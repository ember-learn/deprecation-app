---
title: Deprecate Non Uniq Payloads
until: '6.0'
since: '5.3'
displayId: ember-data:deprecate-relationship-remote-update-clearing-local-state
---

Deprecates when a relationship is updated remotely and the local state is cleared of all changes except for "new" records.

Instead, any records not present in the new payload will be considered "removed" while any records present in the new payload will be considered "added".

This allows us to "commit" local additions and removals, preserving any additions or removals that are not yet reflected in the remote state.

For instance, given the following initial state:

```plaintext
remote: A, B, C
local: add D, E
       remove B, C
=> A, D, E
```

If after an update, the remote state is now A, B, D, F then the new state will be

```plaintext
remote: A, B, D, F
local: add E
       remove B
=> A, D, E, F
```

Under the old behavior the updated local state would instead have been

```plaintext
=> A, B, D, F
```

Similarly, if a belongsTo remote State was A while its local state was B, then under the old behavior if the remote state changed to C, the local state would be updated to C. Under the new behavior, the local state would remain B.

If the remote state was A while its local state was `null`, then under the old behavior if the remote state changed to C, the local state would be updated to C.  Under the new behavior, the local state would remain `null`.

Thus the new correct mental model is that the state of the relationship at any point in time is whatever the most recent remote state is, plus any local additions or removals you have made that have not yet been reflected by the remote state.

> Note: The old behavior extended to modifying the inverse of a relationship. So if you had local state not reflected in the new remote state, inverses would be notified and their state reverted as well when "resetting" the relationship.  Under the new behavior, since the local state is preserved the inverses will also not be reverted.

### Resolving this deprecation

Resolving this deprecation can be done individually for each relationship or globally for all relationships.

To resolve it globally, set the `DEPRECATE_RELATIONSHIP_REMOTE_UPDATE_CLEARING_LOCAL_STATE` to `false` in ember-cli-build.js

```js
let app = new EmberApp(defaults, {
  emberData: {
    deprecations: {
       // set to false to strip the deprecated code (thereby opting into the new behavior)
      DEPRECATE_RELATIONSHIP_REMOTE_UPDATE_CLEARING_LOCAL_STATE: false
    }
  }
})
```

To resolve this deprecation on an individual relationship, adjust the `options` passed to the relationship. For relationships with inverses, both sides MUST be migrated to the new behavior at the same time.

```js
class Person extends Model {
 @hasMany('person', {
   async: false,
   inverse: null,
   resetOnRemoteUpdate: false
 }) children;
 *
 @belongsTo('person', {
   async: false,
   inverse: null,
   resetOnRemoteUpdate: false
 }) parent;
}
```

> Note: false is the only valid value here, all other values (including missing) will be treated as true, where `true` is the legacy behavior that is now deprecated.

Once you have migrated all relationships, you can remove the the resetOnRemoteUpdate option and set the deprecation flag to false in ember-cli-build.
