define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	// Modules
	// var Analytics = require('./App.Analytics');
	// var Cache = require('./App.Cache');
	// var DeviceSupport = require('./App.DeviceSupport');
	// var Locale = require('./App.Locale');
	// var Overrides = require('./Overrides/App.Overrides');
	var Router = require('./App.Router');

	// Views
	// var Navigation = require('./Navigation/CompositeView.Navigation');
	
	// Regions
	// var Modal = require('./Modal/Region.Modal');
	// var Notification = require('./Notification/Region.Notification');

	// ***** BEGIN APP ***** //
	var App = new Backbone.Marionette.Application();
	App.addRegions({
		// Main regions
		navigation: '#navigation',

		// Overlap regions
		// modal: Modal,
		// notification: Notification
	});

	App.addInitializer(function (config) {
		// Extend App with environment variables
		_.extend(App, config);

		// Useful jQuery globals
		App.$window = $(window);
		App.$document = $(document);
		App.$body = $('html, body');

		// App Modules
		// App.DeviceSupport = new DeviceSupport();
		// App.Overrides = new Overrides();
		// App.Cache = new Cache(config);
		// App.Analytics = new Analytics(config);
		// App.Locale = new Locale(config);
		App.Router = new Router(config);

		debugger;
		// Show App Regions
		// App.navigation.show(new Navigation(config));

		// Extend cache functionality to all views
		// _.extend(Backbone.Marionette.View.prototype, {
		// 	cache: App.Cache
		// });

		Backbone.history.start();
	});
	return App;
});