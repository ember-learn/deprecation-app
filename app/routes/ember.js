import Route from '@ember/routing/route';

export default class EmberRoute extends Route {

  controllerName = 'show';
  templateName = 'show';

  model(params) {
    return this.store.query('content', {
      path: 'ember',
      version: params.version,
    });
  }
}
