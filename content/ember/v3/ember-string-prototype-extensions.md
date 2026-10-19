---
title: String prototype extensions
until: 4.0.0
since: 3.24.0
anchor: toc_ember-string-prototype_extensions
displayId: ember-string.prototype-extensions
---


Calling one of the [Ember `String` methods](https://api.emberjs.com/ember/3.22/classes/String) (camelize, capitalize, classify, dasherize, decamelize, htmlSafe, underscore) directly on a string is deprecated.

While Ember addons (`ember addon …`) have prototype extensions disabled by default, they are enabled for applications (`ember new …`) making you able to call `"Tomster".dasherize()`, for example.
Instead of calling the method on the string, you should instead import the function from `@ember/string`.

Before:

```js
let mascot = "Empress Zoey";

mascot.camelize();   //=> "empressZoey"
mascot.capitalize(); //=> "Empress Zoey"
mascot.classify();   //=> "EmpressZoey"
mascot.decamelize(); //=> "empress zoey"
mascot.htmlSafe();   //=> { string: "Empress Zoey" }
mascot.underscore(); //=> "empress_zoey"
mascot.w();          //=> [ "Empress", "Zoey" ]
```

After:

```js
import  {
  camelize,
  capitalize, 
  classify, 
  decamelize,
  underscore, 
  w, 
} from "@ember/string";
import { htmlSafe } from '@ember/template';

let mascot = "Empress Zoey";

camelize(mascot);   //=> "empressZoey"
capitalize(mascot); //=> "Empress Zoey"
classify(mascot);   //=> "EmpressZoey"
decamelize(mascot); //=> "empress zoey"
htmlSafe(mascot);   //=> { string: "Empress Zoey" }
underscore(mascot); //=> "empress_zoey"
w(mascot);          //=> [ "Empress", "Zoey" ]
```

You may also instead rely on methods from another library like [lodash](https://lodash.com/).
Keep in mind that different libraries will behave in slightly different ways, so make sure any critical `String` transformations are thoroughly tested.

You can also [disable String prototype extensions](https://guides.emberjs.com/release/configuring-ember/disabling-prototype-extensions/) by editing your environment file:

```js {data-filename=config/environment.js}
ENV = {
  EmberENV: {
    EXTEND_PROTOTYPES: {
      Date: false,
      String: false,
    }
  }
}
```
