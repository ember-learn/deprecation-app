[![This project uses GitHub Actions for continuous integration.](https://github.com/ember-learn/deprecation-app/workflows/CI/badge.svg)](https://github.com/ember-learn/deprecation-app/actions?query=workflow%3ACI)
[![This project uses Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Ember/deprecation-app)

# deprecation-app

This is the app that serves https://deprecations.emberjs.com/

## Adding new deprecations

The [content](https://github.com/ember-learn/deprecation-app/tree/master/content/) folder contains all the deprecations that are listed by the website. To add a new deprecation, add it to the appropriate folder by creating a new file. The content of the file needs to follow a specific format for the app to work. You can see [this sample](https://raw.githubusercontent.com/ember-learn/deprecation-app/master/content/ember/v3/getting-each.md) for reference.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd deprecation-app`
* `npm install` / `yarn`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

## Troubleshooting

Do you only see a blank page with a header and footer? Or maybe a 404? Make sure to visit
[http://localhost:4200/v3.x](http://localhost:4200/v3.x) to view the app
with data loaded in.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

This app is deployed via CI/CD on merges to the master branch. 

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
