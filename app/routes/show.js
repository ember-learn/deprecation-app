import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.query('content', {
      path: params.project,
      version: params.version,
    })
  }
});
