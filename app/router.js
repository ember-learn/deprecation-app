import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.routerRootURL
});

Router.map(function() {
  this.route("ember", {
    path: ":version"
  });
  this.route("show", {
    path: ":project/:version"
  });
  this.route('filters');
});

export default Router;
