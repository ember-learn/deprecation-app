---
id: jquery-event
title: Use native events instead of jQuery.Event
until: '4.0.0'
since: '3.3'
---

As part of the effort to decouple Ember from jQuery, using event object APIs that are specific to `jQuery.Event` such as
`originalEvent` are deprecated. Especially addons are urged to not use any jQuery specific APIs, so they are able to
work in a world without jQuery.

#### Using native events

jQuery events copy most of the properties of their native event counterpart, but not all of them. See the 
[jQuery.Event API](https://api.jquery.com/category/events/event-object/) for further details. These properties will 
work with jQuery events as well as native events, so just use them without `originalEvent`.

Before:

```javascript
// your event handler:
click(event) {
  let x = event.originalEvent.clientX;
  ...
}
```

After:

```javascript
// your event handler:
click(event) {
  let x = event.clientX;
  ...
}
```

For those other properties it was necessary to get access to the native event object through `originalEvent` though. 
To prevent your code from being coupled to jQuery, use the `normalizeEvent` function provided by `ember-jquery-legacy`, 
which will work with or without jQuery to provide the native event without triggering any deprecations.

```bash
ember install ember-jquery-legacy
```

Before:

```javascript
// your event handler:
click(event) {
  let nativeEvent = event.originalEvent;
  ...
}
```

After:

```javascript
import { normalizeEvent } from 'ember-jquery-legacy';

// your event handler:
click(event) {
  let nativeEvent = normalizeEvent(event);
  ...
}
```

#### Opting into jQuery

For apps which are ok to work only with jQuery, you can explicitly opt into the jQuery integration and thus quash the
deprecations:

```bash
ember install @ember/jquery
ember install @ember/optional-features
ember feature:enable jquery-integration
```






