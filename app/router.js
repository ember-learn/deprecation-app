import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('ember', {
    path: ':version',
  });

  this.route('show', {
    path: ':project/:version',
  });

  this.route('id', { path: 'id/:id' });
});
