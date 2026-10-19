---
title: Don't use `--embroider` option for `ember init` or `ember new`
since: 6.8.0
until: 7.0.0
---

Using `ember init --embroider` or `ember new --embroider` creates a new app with legacy Embroider based around Webpack. 

New apps should prefer the newer blueprint and Vite based workflows. Use `ember init -b @ember/app-blueprint` or `ember new -b @ember/app-blueprint` to create an application based on the new setup.
