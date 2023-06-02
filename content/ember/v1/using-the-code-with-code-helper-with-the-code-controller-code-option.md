---
id: using-the-code-with-code-helper-with-the-code-controller-code-option
title: Using the `{{with}}` Helper with the `controller` option
until: ''
since: '1.13'
---

Another option deprecated due to the de-emphasis of controllers is the controller
option used with the `{{with}}` helper.  In prior versions it was possible to
specify a controller when using `{{with}}`, which would use an instance of the
specified controller as the context within the block.

```javascript
{{#with item.posts controller="myposts"}}
  {{!- numPosts fetched from the controller instance "myposts" }}
  There are {{numPosts}} posts.
{{with}
```

Similar to the
[deprecated {{each}} helper controller options](http://emberjs.com/deprecations/v1.x#toc_view-and-controller-options-on-the-code-each-code-helper)
, this approach triggers less performant compatibility code and is deprecated in
favor of using local properties or components.

#### Using local properties

```javascript
{{#with item.posts as |myPosts|}}
  There are {{myPosts.length}} posts.
{{with}}
```

#### Using a component

```javascript
{{! prints the number of posts (if available) }}
{{post-status posts=item.posts}}
```
