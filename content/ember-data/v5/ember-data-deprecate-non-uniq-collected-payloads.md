---
title: Non Uniq Collection Payloads
until: 6.0.0
since: 5.3.0
displayId: ember-data:deprecate-non-unique-collection-payloads
---

Deprecates when the data for a `hasMany` relationship contains duplicate identifiers.

Previously, relationships would silently de-dupe the data when received, but this behavior is being removed in favor of erroring if the same related record is included multiple times.

For instance, in JSON:API the below relationship data would be considered invalid:

```json
{
 "data": {
  "type": "article",
   "id": "1",
   "relationships": {
     "comments": {
       "data": [
         { "type": "comment", "id": "1" },
         { "type": "comment", "id": "2" },
         { "type": "comment", "id": "1" } // duplicate
       ]
    }
 }
}
```

To resolve this deprecation, either update your server to not include duplicate data, or implement normalization logic in either a request handler or serializer which removes duplicate data from relationship payloads.
