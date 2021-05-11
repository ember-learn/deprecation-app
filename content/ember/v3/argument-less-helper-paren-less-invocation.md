---
id: argument-less-helper-paren-less-invocation
title: Invoking Helpers Without Arguments and Parentheses In Named Argument Positions
until: '4.0.0'
since: '3.27'
---

With [contextual helpers](https://emberjs.github.io/rfcs/0432-contextual-helpers.html)
arriving in Ember, helpers, modifiers and components can increasing be thought
of as first-class variables that can be passed around.

Invoking a helper without arguments or parentheses in named argument positions
can be ambigious and conflicts with this mental model:

```hbs
<SomeComponent @arg={{someHelper}} />
```

In this case, it's ambigious between passing `someHelper` as a value to the
component to be invoked later, or invoking the helper with no arguments and
passing the result into the component.

The current behavior is to invoke the helper with no arguments and passing the
result, but this is counterintuitive in light of the broader "helper as a
value" mental model. Therefore, this invocation style is deprecated in favor of
explicitly invoking the helper with parentheses:

```hbs
<SomeComponent @arg={{(someHelper)}} />
```

Note that this is only required in this specific scenario, where:

1. This is not in a [strict mode](https://emberjs.github.io/rfcs/0496-handlebars-strict-mode.html)
   context, AND
2. `someHelper` is a global helper, i.e. not `this.someHelper`, `@someHelper`
   or a local variable (`{{#... as |someHelper|}}`), AND
3. No arguments are provided to the helper, AND
4. It's in an angle bracket component invocation's named argument position,
   i.e. not `<div id={{someHelper}}>` or `<Foo bar={{someHelper}}>` or
   `{{foo bar=(someHelper)}}`, AND
6. Not parenthesized, i.e. not `@foo={{(helper)}}`, AND
7. Not interpolated, i.e. not `@foo="{{helper}}"`.

In pratice, this is quite rare, as it is rather uncommon for helpers to not
take any arguments.
