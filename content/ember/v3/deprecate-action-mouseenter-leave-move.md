---
id: action.mouseenter-leave-move
title: Deprecate mouseEnter/Leave/Move events in {{action}} modifier
until: '4.0.0'
since: '3.13'
---

As `mouseenter`, `mouseleave` and `mousemove` events fire very frequently, are rarely used and have a higher
implementation cost, support for them in Ember's `EventDispatcher` has been deprecated. As such these events should
not be used with the `{{action}}` modifier anymore.

Before:

```handlebars
<button {{action "handleMouseEnter" on="mouseEnter"}}>Hover</button>
```

After:

```handlebars
<button {{on "mouseenter" this.handleMouseEnter}}>Hover</button>
```

