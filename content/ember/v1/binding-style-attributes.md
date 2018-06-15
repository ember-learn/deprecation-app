---
id: binding-style-attributes
title: Binding Style Attributes
until: ''
since: '1.11'
---
<a id="toc_warning-when-binding-style-attributes"></a>

Content in Handlebars templates is automatically HTML-escaped to help
developers prevent inadvertently introducing cross-site scripting (XSS)
vulnerabilities into their applications.  If you want to display trusted
content as HTML, you can use a `SafeString`, a special string that tells Ember
that the content should be displayed without escaping.

While this works great for HTML, there are some cases where you may bind user
data that the browser interprets as CSS, not HTML. For example, you may bind
the `style` attribute of an element:

```handlebars
<div style={{myStyle}}></div>
```

Handlebars only escapes HTML, not CSS, so this may introduce a potential XSS
vulnerability into your application if a malicious user is able to provide data
used in the `myStyle` property.

Starting in Ember 1.11, you will receive a warning if you attempt to bind the
`style` attribute of an element. Once you have verified that the content being
displayed is trusted and properly escaped, you can disable the warning by
making the content a `SafeString`. For example:

```javascript
  myStyle: Ember.computed('color', function() {
    /* Note: You must implement #escapeCSS. */
    var color = escapeCSS(this.get('color'));
    return Ember.String.htmlSafe("color: " + color);
  })
```

Make sure you don't put quotes around the sanitized string, `myStyle`, when you
bound it in the template. This would prevent Ember from seeing it as safe.

You can learn more about `SafeString`s and writing code that prevents XSS
attacks by reading the [Writing
Helpers](http://guides.emberjs.com/release/templates/writing-helpers/) guide.
