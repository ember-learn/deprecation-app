---
title: Deprecate Non Strict Types
until: '6.0'
since: '5.0'
displayId: <none yet assigned>
---

This is a planned deprecation which will trigger when observer or computed chains are used to watch for changes on any EmberData RecordArray, ManyArray or PromiseManyArray.

Support for these chains is currently guarded by the deprecation flag listed here, enabling removal of the behavior if desired.
