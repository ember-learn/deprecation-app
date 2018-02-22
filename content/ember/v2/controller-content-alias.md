---
id: controller-content-alias
title: Controller#content alias
until: '2.17.0'
since: '2.16'
---

For historical reasons, `Controller`s have a private property named `content` that
aliases the `model` property.

With the introduction of this deprecation, if you wish to continue using `content`
in the controller without a deprecation warning, you will have to add an
explicit alias:

```javascript
import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller {
  content: alias('model')
}
```
