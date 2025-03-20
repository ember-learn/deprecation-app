---
title: V1 addon contentFor types
since: 6.3.0
until: 7.0.0
---
`app-prefix`, `app-suffix`, `tests-prefix`, and `tests-suffix` are deprecated as types passed to `contentFor`. See [RFC 1029](https://rfcs.emberjs.com/id/1029-deprecate-app-prefix) for more information.

#### app-prefix

Returning content from an addon's `contentFor()` hook for `type="app-prefix"` is deprecated. Addons will no longer be allowed to inject arbitrary javascript here. If you need to provide code that apps will run before booting, document that app authors should import and call your code at the start of their own `app.js` file.

#### app-suffix

Returning content from an addon's `contentFor()` hook for `type="app-suffix"` is deprecated. Addons will no longer be allowed to inject arbitrary javascript here. If you need to provide code that apps will run before booting, document that app authors should import and call your code at the start of their own `app.js` file.

If you were using app-suffix to overwrites modules provided by the app, that is intentionally not supported. Adjust your API to tell app authors to import your code and invoke it where appropriate.

#### tests-prefix

Returning content from an addon's `contentFor()` hook for `type="tests-prefix"` is deprecated. Addons will no longer be allowed to inject arbitrary javascript here. Provide utilities that users can import into their own test setup code instead.

#### tests-suffix

Returning content from an addon's `contentFor()` hook for `type="tests-suffix"` is deprecated. Addons will no longer be allowed to inject arbitrary javascript here. Provide utilities that users can import into their own test setup code instead.

#### vendor-prefix

Returning content from an addon's `contentFor()` hook for `type="vendor-prefix"` is deprecated. Addons will no longer be allowed to inject arbitrary javascript here. If you really need to run script (non-module) code, provides your own script via your addon's `/public` directory and either document that app authors should createa a `<script>` element in their HTML that includes it, or use `contentFor()` with one of the `type`s that appears in `index.html` to emit the scrip tag automatically. (`contentFor` targeting HTML is not deprecated, this deprecation only covers targeting javascript bundles.)

#### vendor-suffix

Returning content from an addon's `contentFor()` hook for `type="vendor-suffix"` is deprecated. Addons will no longer be allowed to inject arbitrary javascript here. If you really need to run script (non-module) code, provides your own script via your addon's `/public` directory and either document that app authors should createa a `<script>` element in their HTML that includes it, or use `contentFor()` with one of the `type`s that appears in `index.html` to emit the scrip tag automatically. (`contentFor` targeting HTML is not deprecated, this deprecation only covers targeting javascript bundles.)