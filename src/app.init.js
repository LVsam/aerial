define([

  'jquery',
  'underscore',
  'backbone',
  'marionette'

], function($, _, Backbone, Marionette) {
  'use strict';

  Backbone.Marionette.Renderer.render = function(templateId, data) {
    var path = 'app/templates/' + templateId + '.html';

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    // Make a blocking ajax call (does not reduce performance in production,
    // because templates will be contained by the require.js file).
    if (!JST[path]) {
      $.ajax({
        url: path,
        async: false
      }).then(function(templateHtml) {
        JST[path] = _.template(templateHtml);
      });
    }

    if (!JST[path]) {
      var msg = 'Could not find "' + templateId + '"';
      var error = new Error(msg);
      error.name = 'NoTemplateError';
      throw error;
    }

    // Call the template function with the data.
    return JST[path](data);
  };
  /* ======================================================================== */


  // Creates a new Marionette application. 
  var App = new Marionette.Application();


  // Add the main region, that will hold the page layout.
  App.addRegions({
    regionMain: '#main'
  });

  // Adds any methods to be run after the app was initialized.
  App.addInitializer(function() {
    this.initAppLayout();
  });

  // Start backbone's history for hash navigation after the app was initialized.
  App.on('initialize:after', function() {
    Backbone.history.start({
      pushState: true
    });
  })

  // The main initializing function sets up the basic layout and its regions.
  App.initAppLayout = function() {
    var AppLayout = Backbone.Marionette.Layout.extend({
      template: 'home',
      regions: {
        regionError: '#error', // Contains any error messages.
        regionUserInfo: '#userInfo', // Will contain any user controls (login/logout).
        regionContent: '#content' // Will contain the page content.
      }
    });

    // Inject the main layout into the #main region of the page.
    var layout = new AppLayout();
    App.regionMain.show(layout);
  }

  // Returns the app object to be available to other modules through require.js.
  return App;
});