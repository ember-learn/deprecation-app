---
title: Building Bower Packages
until: 5.0.0
since: 4.3.0
displayId: ember-cli.building-bower-packages
---


Building Bower packages has been deprecated.

Please consider one of the following alternatives:

1. Install the package via the npm registry and use `ember-auto-import` to
import the package into your project
2. If alternative 1 is not an option, you could copy the contents of the Bower
package into the `/vendor` folder and use `app.import` to import the package
into your project
