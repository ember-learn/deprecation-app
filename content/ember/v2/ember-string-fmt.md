---
id: ember-string-fmt
title: Ember.String.fmt
until: '3.0.0'
since: '2.0'
---

`Ember.String.fmt` was designed at a time when interpolating values in a JavaScript
string was cumbersome. With template strings, it has become pratical to do it, and
they are recommended over `Ember.String.fmt`.

To use the examples from the documentation, you should update your code from:

```javascript
let firstName = 'John';
let lastName = 'Doe';

"Hello %@ %@".fmt('John', 'Doe');     // "Hello John Doe"
"Hello %@2, %@1".fmt('John', 'Doe');  // "Hello Doe, John"
```

To the following:

```javascript
let firstName = 'John';
let lastName = 'Doe';

`Hello ${firstName} ${lastName}`  // "Hello John Doe"
`Hello ${lastName}, ${firstName}`  // "Hello Doe, John"
```
