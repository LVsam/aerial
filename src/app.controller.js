define([
  'app.init',
  'app.session'
], function(App, session) {
  'use strict';

  return {

    // The main page.
    index: function() {

      console.log('called index-controller');
    },

    // The login page.
    login: function() {

      console.log('called login-controller');
    },

    // Redirects to the login screen if the user is not logged in.
    isAuthenticated: function() {
      if (!session.authenticated()) {
        App.Router.navigate('login', {
          trigger: true
        });
      }
    }
  };
  
});