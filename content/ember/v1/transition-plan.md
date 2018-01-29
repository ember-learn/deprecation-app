---
id: transition-plan
title: Transition Plan
until: ''
since: '1.9'
---

To transition your code to the new syntax, you can change templates that look like this:

```handlebars
{{#each people}}
  <p>{{firstName}} {{lastName}}</p>
  <p>{{address}}</p>
{{/each}}
```

with:

```handlebars
{{#each person in people}}
  <p>{{person.firstName}} {{person.lastName}}</p>
  <p>{{person.address}}</p>
{{/each}}
```

In preparation for further work on HTMLBars, the context switching form of `{{each}}` is deprecated. This is mostly a "mechanical" refactor and dramatically
simplifies how to think about the context in your templates. This change should be entirely mechanical.

In prior versions you may have done one of the following:

```handlebars
<ul>
  {{#each}}
    <li>{{name}}</li>
  {{/each}}
</ul>
```

```handlebars
<ul>
  {{#each people}}
    <li>{{name}}</li>
  {{/each}}
</ul>
```

You should now be using:

```handlebars
<ul>
  {{#each person in this}}
    <li>{{person.name}}</li>
  {{/each}}
</ul>
```

```handlebars
<ul>
  {{#each person in people}}
    <li>{{person.name}}</li>
  {{/each}}
</ul>
```
