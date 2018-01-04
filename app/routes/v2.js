import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('content', {
      path: 'ember',
      version: 'v2',
    })
  }
});
