---
id: ember-string.prototype-extensions
title: Deprecate String prototype extensions
until: '4.0.0'
since: 'Upcoming Features'
---

Ember applications add methods to the `String` prototype by default, making you able to call `"Tomster".dasherize()`, for example.
Calling [these methods](https://api.emberjs.com/ember/3.22/classes/String) on a string itself should be replaced with importing the function from `@ember/string`.

Before:

```js
let mascot = "Empress Zoey";

mascot.camelize();   //=> empressZoey
mascot.capitalize(); //=> "Empress Zoey"
mascot.classify();   //=> "EmpressZoey"
mascot.decamelize(); //=> "empress zoey"
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

let mascot = "Empress Zoey";

camelize(mascot);   //=> empressZoey
capitalize(mascot); //=> "Empress Zoey"
classify(mascot);   //=> "EmpressZoey"
decamelize(mascot); //=> "empress zoey"
underscore(mascot); //=> "empress_zoey"
w(mascot);          //=> [ "Empress", "Zoey" ]
```

You might want to replace these methods with another library, like [lodash](https://lodash.com/).
Keep in mind that different libraries will behave in slightly different ways, so make sure any critical `String` transformations are thoroughly tested.

You can also [disable String prototype extensions](https://guides.emberjs.com/release/configuring-ember/disabling-prototype-extensions/) by editing your environment file:

```js
// config/environment.js
ENV = {
  EmberENV: {
    EXTEND_PROTOTYPES: {
      Date: false,
      String: false,
    }
  }
}
```