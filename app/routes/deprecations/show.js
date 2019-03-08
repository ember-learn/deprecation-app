import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'deprecations.show',
  templateName: 'deprecations.show',

  model(params) {
    if (
      window.location &&
      window.location.href.match(/(deprecations.emberjs.com|localhost:4200)/) &&
      this.routeName === 'deprecations.show'
    ) {
      return this.replaceWith('show', params.project, params.version)
    }

    return this.store.query('content', {
      path: params.project,
      version: params.version,
    })
  }
});
