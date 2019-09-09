---
id: ember-data:default-serializers
title: Default serializers usage
until: '4.0.0'
since: '3.12.0'
---
## deprecate adapter.serializer and adapter.defaultSerializer fallbacks
If no application and type specific serializer is specified, the default serializer from the type's adapter is used. This behavior is now deprecated.

To clear this deprecation users should implement an application or type specific serializer.

## -default serializer fallback in store.serializerFor
When no model, application or adapter serializer has specified and the default must be used.

To clear this deprecation users should implement their an application serializer.
