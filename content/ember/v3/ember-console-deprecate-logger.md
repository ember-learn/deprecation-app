---
id: ember-console.deprecate-logger
title: Use console rather than Ember.Logger
until: '4.0.0'
since: '3.2'
---

Use of `Ember.Logger` is deprecated. You should replace any calls to `Ember.Logger` with calls to `console`.

In Edge and IE11, uses of `console` beyond calling its methods may require more subtle changes than simply substituting `console` wherever `Logger` appears. In these browsers, they will behave just as they do in other browsers when your development tools window is open. However, when run normally, calls to its methods must not be bound to anything other than the console object or you will receive an `Invalid calling object` exception. This is a known inconsistency with these browsers. (Edge issue #14495220.)

To avoid this, transform the following:

``` javascript
var print = Logger.log; // assigning method to variable
```

to:

``` javascript
// assigning method bound to console to variable
var print = console.log.bind(console);
```

Also, transform any of the following:

``` javascript
Logger.info.apply(undefined, arguments); // or
Logger.info.apply(null, arguments); // or
Logger.info.apply(this, arguments); // or
```

to:

``` javascript
console.info.apply(console, arguments);
```

Finally, because node versions before version 9 don't support console.debug, you may want to transform the following:

``` javascript
Logger.debug(message);
```

to:

``` javascript
if (console.debug) {
  console.debug(message);
} else {
  console.log(message);
}
```

#### Add-on Authors

If your add-on needs to support both Ember 2.x and Ember 3.x clients, you will
need to test for the existence of `console` before calling its methods. If you
do much logging, you may find it convenient to define your own wrapper. Writing
the wrapper as a service will provide for dependency injection by tests and
perhaps even clients.
