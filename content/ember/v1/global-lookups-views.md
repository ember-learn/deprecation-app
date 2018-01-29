---
id: global-lookup-of-views
title: Global lookup of views
until: ''
since: '1.8'
---

Previous to Ember 1.8, views would commonly be fetched from the global
scope:

```handlebars
{{view App.SomeView}}
{{each item in items itemViewClass=App.SomeView}}
```

Since Ember 1.8, views are more appropriately resolved on the application
via strings:

```handlebars
{{view "some"}}
{{each item in items itemViewClass="some"}}
```

They may also be fetched via a binding:

```handlebars
{{view view.someViewViaTheCurrentView}}
{{each itemViewClass=someViewViaAControllerProperty}}
```

In general, it is recommended that your Ember application avoid accessing
globals from a template.
