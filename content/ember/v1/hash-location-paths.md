---
id: hash-location-paths-without-leading-slashes
title: Hash Location Paths Without Leading Slashes
until: ''
since: '1.8'
---

Prior to this release, if you were using `location: 'hash'` (which is the default), you were able to link to a route with a `location.hash` that didn't contain the expected leading forward slash. e.g. `#foo` instead of the correct `#/foo`. Very few, if any, should be impacted by this since the router always produces the correct form.

Doing so is ambiguous because you may also be trying to link to an element on the page whose id matches `<div id="foo">` and it also erroneously will create an extra history state if a user clicks on something that transitions to that route again, since it will change `location.hash === '#/foo'`.

This ability will be removed quickly to allow us to mimic the browser's behavior of scrolling the page to an element whose id matches, but in our case doing so after the transition ends and everything is rendered. Once this feature is added, you'll be able to link to id's even with doubled up hashes: `#/foo#some-id` as well as the expected `#some-id`.
