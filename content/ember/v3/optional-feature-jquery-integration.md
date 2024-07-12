---
title: "Optional Feature: jquery-integration"
until: 4.0.0
since: "3.26"
displayId: optional-feature.jquery-integration
---


Setting the `jquery-integration` optional feature to `true` has been
deprecated. You must set this feature to `false`, disabling jQuery integration.
This only disables **integration** with Ember, jQuery can still be included and
used as an independent library via the [`@ember/jquery` addon](https://github.com/emberjs/ember-jquery).

For more details on this optional feature, including the changes in
behavior disabling it causes and how you can disable it, see the
[optional features section](https://guides.emberjs.com/release/configuring-ember/optional-features/#toc_removing-jquery)
of the Ember guides.
