---
title: "Edition: Classic"
until: 4.0.0
since: 3.26.0
displayId: editions.classic
---


The edition of Ember prior to Ember Octane is known as Ember Classic. This edition
has been deprecated, which means that users must update to Ember Octane. To do this,
you must:

- Flip the appropriate optional feature flags for Octane:
  - `application-template-wrapper: false`
  - `template-only-glimmer-components: true`
- Set the edition in the application's `package.json` to `"octane"`:

```json
{
  "ember": {
    "edition": "octane"
  }
}
```

For more details on how to upgrade to Octane, see the [official upgrade guide](https://guides.emberjs.com/release/upgrading/current-edition/).
You can also run `npx @ember/octanify`, which will attempt to update these values
automatically.
