import DS from 'ember-data';
import ENV from 'book-crater-ember-frontend/config/environment';

var ApplicationAdapter = DS.JSONAPIAdapter.extend({
  host: ENV.APP.host
});

export default ApplicationAdapter;
