---
title: "Deprecation: Classic Class Syntax"
until: 7.0.0
since: 6.5.0
---

With the introduction of native class syntax in JavaScript, Ember is deprecating its classic class syntax, which includes `extend`, `reopen`, and `reopenClass`. This guide will help you migrate your code to the modern syntax.

### `extend`

The `extend` method was used to create a new class that inherited from a parent class. This can be replaced with the `class` and `extends` keywords in native JavaScript.

**Before:**

```javascript
import EmberObject from '@ember/object';

const MyService = EmberObject.extend({
  // ...
});
```

**After:**

```javascript
import EmberObject from '@ember/object';

class MyService extends EmberObject {
  // ...
}
```

### `reopen`

The `reopen` method was used to modify an existing class by adding new properties and methods. This is a risky pattern because it modifies the class for all consumers, which can lead to unexpected behavior. There is no direct replacement for `reopen`. Instead, you should refactor your code to avoid modifying classes at runtime. If you must add functionality, consider using composition or creating a subclass.

**Before:**

```javascript
import MyService from './my-service';

MyService.reopen({
  // ...
});
```

**After:**

There is no direct replacement for `reopen`. You should refactor your code to avoid this pattern. If you need to add functionality, consider creating a subclass:

```javascript
import MyService from './my-service';

class ExtendedService extends MyService {
  // ...
}
```

### `reopenClass`

The `reopenClass` method was used to add static properties and methods to a class. This can be replaced with the `static` keyword in native JavaScript.

**Before:**

```javascript
import MyService from './my-service';

MyService.reopenClass({
  isMyService: true,
});
```

**After:**

```javascript
import EmberObject from '@ember/object';

class MyService extends EmberObject {
  static isMyService = true;
}
```
