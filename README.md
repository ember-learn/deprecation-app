[![This project uses GitHub Actions for continuous integration.](https://github.com/ember-learn/deprecation-app/workflows/CI/badge.svg)](https://github.com/ember-learn/deprecation-app/actions?query=workflow%3ACI)
[![This project uses Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Ember/deprecation-app)

# deprecation-app

This is the app that serves https://deprecations.emberjs.com/

## Linking to deprecations

You can link to a specific deprecation by using the ID of the deprecation. For example, to link to the deprecation with the ID `my-old-api`, you can use the following URL:
`https://deprecations.emberjs.com/id/my-old-api`. These URLs can be generated in advance of adding the deprecation guide, when the deprecation lands in the code.
When adding a deprecation the filename should match the ID of the deprecation, or the `displayId` should be specified in the frontmatter.

## Adding new deprecations

The [content](https://github.com/ember-learn/deprecation-app/tree/main/content/) folder contains all the deprecations that are listed by the website. To add a new deprecation, add it to the appropriate folder by creating a new file. The content of the file needs to follow a specific format for the app to work. You can see [this sample](https://raw.githubusercontent.com/ember-learn/deprecation-app/main/content/ember/v3/getting-the-each-property.md) for reference.

### Frontmatter

#### Grouping deprecations

```markdown
  parent: deprecation-id
```

Can be used to nest deprecations under a parent grouping for the purpose of the UI. The deprecations will still be available via the direct ID URLs.


## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd deprecation-app`
- `npm install`

## Running / Development

- `ember serve`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Troubleshooting

Do you only see a blank page with a header and footer? Or maybe a 404? Make sure to visit
[http://localhost:4200/v3.x](http://localhost:4200/v3.x) to view the app
with data loaded in.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `ember test`
- `ember test --server`

### Linting

- `npm run lint`
- `npm run lint:fix`

### Building

- `npm run build` (production)

### Deploying

The app is continuously deployed to Netlify when a pull request is merged and passes continuous integration.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
