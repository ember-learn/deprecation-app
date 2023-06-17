---
id: ember-data:deprecate-instantiate-record-args
title: Deprecate Instantiate Record Args
until: '5.0'
since: '4.12'
---

Deprecates using the former 3rd and 4th arguments to `Store.instantiateRecord` which are now available as properties on the store.

Before:

```ts
{
  instantiateRecord(identifier, createArgs, recordDataFor, notifications) {
    const cache = recordDataFor(identifier);
  }
}
```

After:

```ts
{
  instantiateRecord(identifier, createArgs) {
     const { cache, notifications } = this;
  }
}
```
