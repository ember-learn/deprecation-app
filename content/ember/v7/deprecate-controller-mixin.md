---
title: 'ControllerMixin'
until: 7.9.0
since: 7.4.0
---

`ControllerMixin` from `@ember/controller` is deprecated. Extend `Controller` from the same module instead. `ControllerMixin` was private but was importable.

### Before

```javascript
// app/controllers/settings.js
import EmberObject from '@ember/object';
import { ControllerMixin } from '@ember/controller';

export default class SettingsController extends EmberObject.extend(ControllerMixin) {
  queryParams = ['tab'];
  tab = 'general';
}
```

### After

```javascript
// app/controllers/settings.js
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class SettingsController extends Controller {
  queryParams = ['tab'];
  @tracked tab = 'general';
}
```

For more background, read [RFC 1116](https://github.com/emberjs/rfcs/pull/1116).
