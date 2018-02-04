---
id: ember-select
title: Ember.Select
until: ''
since: '1.13'
---

Using the `Ember.Select` global and its view helper form (`{{view 'select'}}`)
is deprecated. `Ember.Select` in Ember 1.x is implemented in a legacy coding
style that uses patterns such as observers and two-way data binding that
can cause pathological performance problems and provide an experience that
is not consistent with idiomatic Ember 2.0 development.

Legacy support of `Ember.Select` will be provided via the [ember-legacy-views](https://github.com/emberjs/ember-legacy-views) addon.

Ember 2.0 provides several new features that make it much more straightforward
to implement &lt;select&gt; tag functionality via the
data-down, actions-up paradigm in one's codebase.
For example, to create a component that displays a prompt and a list of
dropdown options, the following code could be used:

```handlebars {data-filename=app/templates/components/my-select.hbs}
<select {{action 'change' on='change'}}>
  {{#each content key="@index" as |item|}}
    <option value="{{item}}" selected={{is-equal item selectedValue}}>
      {{item}}
    </option>
  {{/each}}
</select>
```

```javascript {data-filename=app/components/my-select.js}
import Ember from "ember";

export default Ember.Component.extend({
  content: null,
  selectedValue: null,

  didInitAttrs(attrs) {
    this._super(...arguments);
    var content = this.get('content');

    if (!content) {
      this.set('content', []);
    }
  },

  actions: {
    change() {
      const changeAction = this.get('action');
      const selectedEl = this.$('select')[0];
      const selectedIndex = selectedEl.selectedIndex;
      const content = this.get('content');
      const selectedValue = content[selectedIndex];

      this.set('selectedValue', selectedValue);
      changeAction(selectedValue);
    }
  }
});
```

```javascript {data-filename=app/helpers/is-equal.js}
// is-equal helper is necessary to determine which option is currently selected.
import Ember from "ember";

export default Ember.Helper.helper(function([leftSide, rightSide]) {
  return leftSide === rightSide;
});
```

This component could be used in a template by supplying it an array of strings
as `content` and an action to call when the user makes a selection as `change`:

```handlebars {data-filename=app/templates/application.hbs}
The currently selected item: {{mySelectedItem}}.

{{! myItems is an array of strings: ['first', 'second', 'third',...] }}
{{! This uses the `action` and `mut` helpers to pass in an action that
    will update the (outer scope) `mySelectedItem` property with the user's
    selection. }}
{{my-select content=myItems action=(action (mut mySelectedItem))}}
```

A more complete example of a `select` component that mimics many features of the
deprecated `Ember.Select` is [available in this jsbin](http://emberjs.jsbin.com/fotuqa).

Here is an [example jsbin showing usage of the select tag directly in a template without a component](http://emberjs.jsbin.com/zezapu).

There are many [Ember-CLI addons that provide select-like functionality](http://emberobserver.com/categories/select).
[emberx-select](http://emberobserver.com/addons/emberx-select) in particular
aims to provide a select component based on the native html select. Alternative
`select` component implementations can be iterated upon in addons to identify
best practices and perhaps moved into an official Ember 2.x implementation in
the future.
