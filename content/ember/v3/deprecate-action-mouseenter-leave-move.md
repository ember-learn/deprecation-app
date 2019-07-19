---
id: action.mouseenter-leave-move
title: Deprecate mouseEnter/Leave/Move events in {{action}} modifier
until: '4.0.0'
since: 'Upcoming Features'
---

As `mouseenter`, `mouseleave` and `mousemove` events fire very frequently, are rarely used and have a higher
implementation cost, support for them in Ember's `EventDispatcher` has been deprecated. As such these events should
not be used with the `{{action}}` modifier anymore.

Before:

```hbs
<button {{action "handleMouseEnter" on="mouseEnter"}}>Hover</button>
```

After:

```hbs
<button {{on "mouseenter" this.handleMouseEnter}}>Hover</button>
```

