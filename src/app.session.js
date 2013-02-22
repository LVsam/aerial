define([
  'jquery',
  'underscore',
  'backbone',
  'cookies'
],
function($, _, Backbone){
  'use strict';

  var Session = Backbone.Model.extend({

    // On default, neither accessToken nor userId will be available.
    defaults: {
        'accessToken': null,
        'userId': null
    },

    // Creating a new session instance will attempt to load the user cookie.
    initialize: function() {
        this.load();
    },

    // Returns true if the user is authenticated.
    authenticated: function() {
        return Boolean(this.get('accessToken'));
    },

    // Saving will create the cookie data instead of syncing the model.
    save: function(authHash) {
        $.cookie('userId', authHash.id);
        $.cookie('accessToken', authHash.accessToken);
    },

    // Loads the user's credentials from the cookie data.
    load: function() {
        this.userId = $.cookie('userId');
        this.accessToken = $.cookie('accessToken');
    }
  });

  // Creating a new session will load the user's credentials from the cookie
  // data – if available.
  return new Session();

});