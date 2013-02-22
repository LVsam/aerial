define([
  'underscore',
  'backbone',
  'marionette',
  'app.controller'
], function(Backbone, Marionette, controller) {
  'use strict';

  var Router = Marionette.Router.extend({

    appRoutes: {

      '' : 'index'

    }

  });

  return new Router({
    controller: controller
  });

});