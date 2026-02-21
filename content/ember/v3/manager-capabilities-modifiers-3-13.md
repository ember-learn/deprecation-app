---
title: 3.13 Modifier Manager Capabilities
until: 4.0.0
since: 3.26.0
displayId: manager-capabilities.modifiers-3-13
---


Any modifier managers using the `3.13` capabilities should update to the most
recent modifier capabilities, currently `3.22`. In `3.22`, the major changes
are:

1. The modifier definition, associated via `setModifierManager` is passed
   directly to `create`, rather than a factory wrapper class. Previously, you
   would access the class via the `class` property on the factory wrapper:

   ```js
   // before
   class CustomModifierManager {
     capabilities = capabilities('3.13');

     createModifier(Definition, args) {
       return new Definition.class(args);
     }
   }
   ```

   This can be updated to use the definition directly:

   ```js
   // after
   class CustomModifierManager {
     capabilities = capabilities('3.22');

     createModifier(Definition, args) {
       return new Definition(args);
     }
   }
   ```

2. Args are both lazy and autotracked by default. This means that in order to
   track an argument value, you must actually use it in your modifier. If you do
   not, the modifier will not update when the value changes.

   If you still need the modifier to update whenever a value changes, even if it
   was not used, you can manually access every value in the modifiers
   `installModifier` and `updateModifier` lifecycle hooks:

   ```js
   function consumeArgs(args) {
     for (let key in args.named) {
       // consume value
       args.named[key];
     }

     for (let i = 0; i < args.positional.length; i++) {
       // consume value
       args.positional[i];
     }
   }

   class CustomModifierManager {
     capabilities = capabilities('3.22');

     installModifier(bucket, element, args) {
       consumeArgs(args);

       // ...
     }

     updateModifier(bucket, args) {
       consumeArgs(args);

       // ...
     }
   }
   ```

   In general this should be avoided, however, and users who are writing
   modifiers should instead use the value if they want it to be tracked by the
   modifier.
