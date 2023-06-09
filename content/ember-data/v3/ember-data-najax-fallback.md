---
title: "`najax` requests"
until: 4.0.0
since: 3.22.0
displayId: ember-data:najax-fallback
---

#### Deprecates `najax` requests in ember-data
Previously if users had [`najax`](https://github.com/najaxjs/najax) installed, `ember-data` would try and make a request in FastBoot with najax. This was a dependency of FastBoot; however, was [removed](https://github.com/ember-fastboot/fastboot/pull/247) in v3.0.0.

Following FastBoot's lead, najax is now deprecated.

If you do not have jQuery [enabled](https://guides.emberjs.com/release/configuring-ember/optional-features/), this deprecation does not apply to you. However, still ensure steps 1-2 are true for your app.

If you do have jQuery enabled, there are a few steps you may need to take.

1. Ensure you have installed [`ember-fetch`](https://github.com/ember-cli/ember-fetch). This may be already installed.
2. You may have `najax` passed through the [`buildSandboxGlobals`](https://github.com/ember-fastboot/fastboot#usage) API in FastBoot.  This should be removed.

Lastly, at this point you have a few options to consider.

3.
  a. Set `useFetch = true` on your adapter. This is the likely path you should take.

##### before

```js
export default ApplicationAdapter extends JSONAPIAdapter {
  ...
}
```

##### after

```js
export default ApplicationAdapter extends JSONAPIAdapter {
  useFetch = true;
}
```

b. You can also opt-in and and configure your ember-data compatibility version to `3.22` or higher. See documentation [here](https://api.emberjs.com/ember-data/release/modules/@ember-data%2Fdeprecations).

```js
// ember-cli-build.js
let app = new EmberApp(defaults, {
    emberData: {
      compatWith: '3.22',
    },
});
```
