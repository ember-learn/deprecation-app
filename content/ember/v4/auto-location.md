---
id: deprecate-auto-location
title: AutoLocation Class
until: '5.0.0'
since: '4.1.0'
---

#### Background

Several years ago only some browsers supported the (then) new History Location API.
Others could only serialize the router location into an url hash `my/path#/ember/route`.

To handle this dynamically, Ember built an AutoLocation that would feature-detect
and use either 'hash' or 'history' as the underlying mechanism.

These days, virtually all browsers support the history API, so this is what 'auto'
will resolve to in almost every case. Since 'auto' has served its purpose, it's being removed.

#### Required Changes

Set `locationType` in `config/environment.js` to `'history'`. This is it,
your app should work just like it used to.

Unless you know for sure that you need to keep feature detection in place (few need that),
or that you'd like to use the 'hash' location strategy (rarely used in browsers,
but can be useful for mobile apps delivered via a webview).

#### Advanced Stuff

If you implemented your own Location class and used the `detect` method,
this one is now deprecated. If you need feature detection you can run your
detection code in app.js, before setting the location type.

```js
// app/router.js
export default class Router extends EmberRouter {
  location = (historyFeatureDetection() ? 'history' : 'hash');
  // …
}
```

For more background, read the [RFC](https://github.com/emberjs/rfcs/blob/master/text/0711-deprecate-auto-location.md).
