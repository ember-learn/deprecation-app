---
id: deprecate-auto-location
title: AutoLocation Class
until: '5.0.0'
since: '4.1.0'
---

#### Background

Several years ago (in Ember v1 days) few browsers supported the History Location API,
and other browsers could only serialize the router location into an URL hash `my/path#/ember/route`.

To handle this dynamically, Ember had an AutoLocation class that would use feature-detection to 
determine if the browser supported the History Location API, and use either 'hash' or 'history' 
as the underlying mechanism.

These days, virtually all browsers support the history API, so 'auto' will always resolve to 
'history' as the location mechanism. Since 'auto' has served its purpose, it's being removed.

#### Required Changes

Set `locationType` in `config/environment.js` to `'history'`. This is it. 
Your app should work just like it used to.

~~~js
// config/environment.js
'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'my-app',
    environment: environment,
    rootURL: '/',
    locationType: 'history', // add or edit this line
    …
};
~~~

#### Advanced Stuff

1. Note that the 'hash' location type is still around, you just have to set it manually.
It's sometimes used in Ember apps running inside webviews (native mobile apps), for example.

2. If you implemented your own `Location` class and used the `detect` method,
this one is now deprecated. 

3. If you need feature detection you can run your detection code in app/router.js, 
before setting the location type.

```js
// app/router.js
export default class Router extends EmberRouter {
  location = (historyFeatureDetection() ? 'history' : 'hash');
  // …
}
```

For more background, read the [RFC](https://github.com/emberjs/rfcs/blob/master/text/0711-deprecate-auto-location.md).
