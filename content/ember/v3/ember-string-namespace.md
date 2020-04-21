---
id: ember-string.namespace
title: Ember.String namespace
until: '4.0.0'
since: 'Upcoming Features'
---

We are deprecating usage of the utilities under the `Ember.String` namespace.

This includes:

* camelize
* capitalize
* classify
* dasherize
* decamelize
* underscore
* loc
* w
* htmlSafe
* isHTMLSafe

Starting with Ember v2.18.0 [TODO: update to proper version], the `@ember/string`
package was extracted from the Ember codebase into a separate module.
This marks the beginning of the effort to slim down the code that is included by
default in Ember applications.

You should `ember install @ember/string`.

#### `camelize`, `capitalize`, `classify`, `dasherize`, `decamelize`, `underscore`, `w`

Go from:

```javascript
import Ember from "ember";

Ember.String.camelize("my string"); // MyString
Ember.String.capitalize("my string"); // My String
Ember.String.classify("my string"); // MyString
Ember.String.dasherize("my string"); // my-string
Ember.String.decamelize("MyString"); // my string
Ember.String.underscore("my string"); // my_string

Ember.String.w("my string"); //
```

To:

```javascript
import {
  camelize,
  capitalize,
  classify,
  dasherize,
  decamelize,
  underscore
} from "@ember/string";

camelize("my string"); // MyString
capitalize("my string"); // My String
classify("my string"); // MyString
dasherize("my string"); // my-string
decamelize("MyString"); // my string
underscore("my string"); // my_string

w("my string"); //
```

#### `Ember.String.htmlSafe` and `Ember.String.isHTMLSafe`

Go from:

```javascript
import Ember from "ember";

let myString = "my string";

Ember.String.htmlSafe(myString);
Ember.String.isHTMLSafe(myString);
```

or:

```javascript
import { htmlSafe, isHTMLSafe } from "@ember/component";

let myString = "my string";

htmlSafe(myString);
isHTMLSafe(myString);
```

To:

```javascript
import { htmlSafe, isHTMLSafe } from "@ember/template";

let myString = "my string";

htmlSafe(myString);
isHTMLSafe(myString);
```

#### `Ember.String.loc` and `import { loc } from '@ember/string'`

We recommend using a proper localization/internationalization solution.

You can consult a curated list of addons that provide these functionalities in the [Ember Observer Internationalization category](https://emberobserver.com/categories/internationalization).
