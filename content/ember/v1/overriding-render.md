---
id: overriding-code-render-code-when-extending-a-component-or-view
title: Overriding `render` When Extending a Component or View
until: ''
since: '1.13'
---

The `render` method on components and views should not be overridden and will
go away in Ember 2.x.  Modifications to Ember rendering should be made by
overriding Ember's new
[component lifecycle hooks](http://emberjs.com/blog/2015/06/12/ember-1-13-0-released.html#toc_component-lifecycle-hooks)
, introduced in version 1.13.
