---
id: ember.link-to.tag-name
title: Passing tagName to LinkTo
until: '5.0.0'
since: '4.0.0'
---

Passing the `@tagName` argument to <LinkTo> is deprecated. Using a non-anchor
element for navigation is not recommended as it creates issues with assistive
technologies. Remove this argument to use the default <a> element. In the rare
cases that calls for using a different element, refactor to use the router
service inside a custom event handler instead.
