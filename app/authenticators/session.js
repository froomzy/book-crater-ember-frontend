import Ember from "ember";
import Base from "ember-simple-auth/authenticators/base";
import ENV from "book-crater-ember-frontend/config/environment";
const { RSVP, isEmpty, run, computed } = Ember;

export default Base.extend({
  cookies: Ember.inject.service(),
  serverTokenEndpoint: '/api/core/sessions/',

  // TODO (Dylan): Add in a restore method. It will look to see if it can find the session token, and make sure it is valid.
  authenticate(email, password) {
    return new RSVP.Promise((resolve, reject) => {
      const data                = { email, password };
      const serverTokenEndpoint = this.get('serverTokenEndpoint');
      const url                 = ENV.APP.host + serverTokenEndpoint;
      this.makeRequest(url, {type: 'POST', data: data, dataType: 'json', xhrFields: {withCredentials: true}})
        .done((data) => {
        run(() =>{
          resolve(data);
        });
      }).fail((xhr) => {
        run(null, reject, xhr.responseJSON || xhr.responseText);
      });
    });
  },
  invalidate(data) {
    let cookieService = this.get('cookies');
    return new RSVP.Promise((resolve, reject) => {
      const csrfToken           = cookieService.read('book-crater-django');
      console.log(csrfToken);
      const serverTokenEndpoint = this.get('serverTokenEndpoint');
      const url                 = ENV.APP.host + serverTokenEndpoint;
      this.makeRequest(url, {type: 'DELETE', xhrFields: {withCredentials: true}, headers: {'x-csrftoken': csrfToken}})
      .done((data) => {
        run(() =>{
          resolve(data);
        });
      }).fail((xhr) => {
        run(null, reject, xhr.responseJSON || xhr.responseText);
      });
    });
  },
  makeRequest(url, options) {
    return Ember.$.ajax(url, options);
  }
});
