---
id: ember.partial
title: Deprecate `{{partial}}`
until: '4.0.0'
since: '3.15'
---

We are deprecating usage of `{{partial}}` in accordance with [RFC #449](https://github.com/emberjs/rfcs/blob/master/text/0449-deprecate-partials.md).

Partials should be migrated to components. For example, consider the following `quick-tip` partial:

```handlebars {data-filename=app/templates/application.hbs}
{{#let (hash title="Don't use partials" body="Components are always better") as |tip|}}
  {{partial "partials/quick-tip"}}
{{/let}}
```

```handlebars {data-filename=app/templates/partials/quick-tip.hbs}
<h1>Tip: {{tip.title}}</h1>
<p>{{tip.body}}</p>
<button {{on "click" this.dismissTip}}>OK</button>
```

It can be converted to a component as follows:

```handlebars {data-filename=app/templates/application.hbs}
{{#let (hash title="Don't use partials" body="Components are always better") as |tip|}}
  <QuickTip @tip={{tip}} @onDismiss={{this.dismissTip}} />
{{/let}}
```

```handlebars {data-filename=app/templates/components/quick-tip.hbs}
<h1>Tip: {{@tip.title}}</h1>
<p>{{@tip.body}}</p>
<button {{action @onDismiss}}>OK</button>
```
