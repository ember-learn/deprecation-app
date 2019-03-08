import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'deprecations.show',
  templateName: 'deprecations.show',
  model(params) {
    if (
      window.location &&
      window.location.href.match(/(deprecations.emberjs.com|localhost:4200)/) &&
      this.routeName === 'deprecations.ember'
    ) {
      return this.replaceWith('ember', params.version)
    }

    return this.store.query('content', {
      path: 'ember',
      version: params.version,
    })
  }
});
