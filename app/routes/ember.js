import Route from '@ember/routing/route';

export default Route.extend({
  redirect(params) {
    this.transitionTo('show', 'ember', params.version);
  }
});
