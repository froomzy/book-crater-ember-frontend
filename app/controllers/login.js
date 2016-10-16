import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let { email, password } = this.getProperties('email', 'password');
      this.get('session').authenticate('authenticator:session', email, password).catch((reason) => {
        this.set('errorMessage', reason.errors.error);
      });
    }
  }
});
