---
id: using-code-code-for-namespace-in-the-code-render-code-helper
title:  Using `/` for namespace in the `{{render}}` helper
until: ''
since: '1.13'
---

When using the render helper, its possible to specify a context within a nested directory structure.  Prior to 1.13, it
was acceptable to separate nested directories using slashes `/`, but this is now deprecated, as Ember has
settled on using dot notation for namespacing.

For example, a developer might have a controller at `app/controllers/blog/posts.js` and is using the render helper to
render that controller context within another template.

Instead of using `{{render 'blog/posts'}}`, use `{{render 'blog.posts'}}`.  That will render the template associated with
`app/controllers/blog/posts.js` in your directory structure.