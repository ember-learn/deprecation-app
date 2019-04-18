import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("ember", {
    path: ":version"
  });
  this.route("show", {
    path: ":project/:version"
  });
});

export default Router;
