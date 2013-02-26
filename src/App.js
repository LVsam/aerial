define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');


	// Modules
	// var Analytics = require('./App.Analytics');
	var Cache = require('./App.Cache');
	// var DeviceSupport = require('./App.DeviceSupport');
	// var Locale = require('./App.Locale');
	// var Overrides = require('./Overrides/App.Overrides');
	var Router = require('./App.Router');

	// Views
	// var Navigation = require('./Navigation/CompositeView.Navigation');
<<<<<<< HEAD
	var Controls = require('./Controls/View.Controls');
	var Timeline = require('./Timeline/View.Timeline');
	var NetWorth = require('./NetWorth/ItemView.NetWorth');
	var Folders = require('./Folders/View.Folders');
=======
	var Controls = require('./Views/Controls/View.Controls');
	var Timeline = require('./Views/Timeline/View.Timeline');
	var NetWorth = require('./Views/NetWorth/ItemView.NetWorth');
>>>>>>> 49843b1dcc8c5c64dc8d762997bd2ffc29d22ef5


	// Regions
	// var Modal = require('./Modal/Region.Modal');
	// var Notification = require('./Notification/Region.Notification');

	// ***** BEGIN APP ***** //
	var App = new Backbone.Marionette.Application();
	App.addRegions({
		// Main regions
		// navigation: '#navigation',
		netWorth: '#net-worth',
		timeline: '#timeline',
		controls: '#ui-controls',
		folders: '#folders'

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


			// AJAX
		$.ajaxSetup({
			beforeSend: function (xhr, settings) {
				xhr.setRequestHeader('User-Context', "ca3c9beff71cd8a6b80a7ab0abcbc06a");
			}
		});

		// App Modules
		// App.DeviceSupport = new DeviceSupport();
		// App.Overrides = new Overrides();
		App.Cache = new Cache(config);
		// App.Analytics = new Analytics(config);
		// App.Locale = new Locale(config);
		App.Router = new Router(config);

		App.controls.show(new Controls(config));
		//App.timeline.show(new Timeline(config));
		//App.netWorth.show(new NetWorth(config));
		App.folders.show(new Folders());

		// Show App Regions
		// App.navigation.show(new Navigation(config));

		// Extend cache functionality to all views
		_.extend(Backbone.Marionette.View.prototype, {
			cache: App.Cache
		});

		Backbone.history.start();
	});
	return App;
});