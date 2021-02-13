---
id: ember-string.loc
title: '`@ember/string#loc` and `{{loc}}`'
until: '4.0.0'
since: '3.24'
---

Ember provides a very basic localization method via the `@ember/string` package `loc` function, and the related `{{loc}}` template helper.

This feature was introduced a long time ago but is insufficient for most use cases.
We suggest you replace it with an addon in the [Internationalization category](https://emberobserver.com/categories/internationalization) of Ember Observer.

A popular addon that supports [ICU (International Components for Unicode)](http://userguide.icu-project.org/formatparse/messages) message syntax and native browser Intl is [ember-intl](https://ember-intl.github.io/ember-intl/).
Check the [documentation](https://ember-intl.github.io/ember-intl/docs) for more detailed information.
