---
id: base-url
title: Base URL
until: '3.0.0'
since: '2.7.0'
---

The usage of `baseURL` setting in `config/environments.js` has been deprecated in favor of using
an explicit `rootURL`. A detailed explanation of the problem and the migration path can be found in
[this blog post](/blog/2016/04/28/baseURL.html).

Migration for pre-2.7 applications is:

1. Update `config/environment.js` to remove reference to `baseURL` and update to `rootURL`.
2. Update `app/index.html` to add `{{rootURL}}` a the beginning of all assets that are loaded.
3. Update the `app/router.js` to pass `rootURL` to the subclass of `Ember.Router` being created.

More detailed descriptions of this migration can be found on the blog: [here](/blog/2016/04/28/baseURL.html)
