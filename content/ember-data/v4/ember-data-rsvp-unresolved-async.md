---
displayId: ember-data:rsvp-unresolved-async
title: Rsvp Unresolved Async
until: 5.0.0
since: 4.5.0
---

Deprecates when a request promise did not resolve prior to the store tearing down.

Note: in most cases even with the promise guard that is now being deprecated a test crash would still be encountered.

To resolve: Tests or Fastboot instances which crash need to find triggers requests and properly await them before tearing down.
