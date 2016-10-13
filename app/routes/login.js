import Ember from 'ember';
import config from './config/environment';

Router = Ember.Route.extend({});

Router.map(function() {
  this.route('login');
});

export default Router;
