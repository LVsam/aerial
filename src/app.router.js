define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	// var Dashboard = require('./Routes/Routes.Dashboard');
	// var Inbox = require('./Routes/Routes.Inbox');
	// var Budget = require('./Routes/Routes.Budget');
	// var Priorities = require('./Routes/Routes.Priorities');
	// var Accounts = require('./Routes/Routes.Accounts');
	// var WelcomeModal = require('./WelcomeModal/Layout.WelcomeModal');
	// var BrowserModal = require('./BrowserModal/Layout.BrowserModal');
	// var PathNotFound404View = require();
	// Map the Sections resources:
	// 1) View Constructor
	// 2) Trigger name
	// 3) Subnav button id
	// var resourceMap = _.extend({}, Dashboard.resources, Inbox.resources, Budget.resources, Priorities.resources, Accounts.resources);
	// // Section Model manages the state of the subnav section
	// var sectionModel = new Backbone.Model();
	// var swipeModel = new Backbone.Model();
	return Backbone.Marionette.AppRouter.extend({
		// sectionModel: sectionModel,
		// getState
		// Maintains the current section of the app i.e., 'inbox', 'budget', etc.
		// getState: function() {
		// 	return sectionModel.get('state');
		// },
		// // forceRoute
		// // This triggers a forced route by appending a '?' to fool the App.Router into thinking a route change has
		// // happened.
		// forceRoute: function(route) {
		// 	if(App.modal.isOpen()) return;
		// 	sectionModel.set('forced', true);
		// 	App.Router.navigate(route + '?', {
		// 		trigger: true
		// 	});
		// 	App.Router.navigate(route, {
		// 		trigger: true
		// 	});
		// 	sectionModel.set('forced', false);
		// },
		// navigateWithTracking
		// Serve the same role as App.Router.navigate(), except make a call to trackPageView for analytics
		// 
		// fragment: route to navigate to/track
		// altFragment: route to track in Google Analytics
		// options: passed in full to App.Router.navigate();
		navigateWithTracking: function (fragment, options) {
			// if(App.modal.isOpen()) return;
			// App.Router.navigate(fragment, options);
			// this.controller.trackPageView('/mylv/money/' + fragment);
		},
		appRoutes: {
			// Error Routes
			'404': 'pathNotFound404',

			// Default
			'': 'defaultRoute',
			'*path': 'defaultRoute'
		},
		controller: {
			pathNotFound404: function () {
				// TODO: implement
				// App.main.show(new PathNotFound404View());
			},
			defaultRoute: function () {
				// if(App.modal.isOpen()) return;
				// var defaultRoute = 'dashboard';
				// App.Router.navigate(defaultRoute, {
				// 	trigger: true
				// });
				// this.trackPageView(defaultRoute);
			},
			// triggerRoute
			// highlights the correct subnav, renders the section passed in if you are on a different page,
			// emits triggers to the subsections, and passes along the relevant params or model to the sub view via
			// triggers.
			//
			// To use:
			// this.triggerRoute('inbox');
			triggerRoute: function (section, options) {

				// if(App.modal.isOpen()) return;
				// var resource = resourceMap[section];
				// if((sectionModel.get('state') !== section) || sectionModel.get('forced')) {
				// 	// Trigger the subnav button highlight
				// 	App.vent.trigger('subnav:select', resource.button);
				// 	// set section model to new section
				// 	sectionModel.set('state', section);
				// 	App.main.show(new resource.constructor(options || {}));
				// }
				// // Trigger the view's instantiation
				// if(options) {
				// 	// var sectionTrigger = resource.trigger;
				// 	// var trigger = _.flatten(_.compact([sectionTrigger, subsections])).join(':');
				// 	// App.vent.trigger(trigger, param || null);
				// }
				// this.welcomeCenter();
				// this.isBrowserSupported();
				// /** 
				//  * scroll the window to the top
				//  */
				// App.$body.animate({
				// 	scrollTop: 0
				// });
			},

			// trackPageView
			// Handles forwarding App.analytics and Google Analytics calls
			trackPageView: function (page) {

			}
		}
	});
});