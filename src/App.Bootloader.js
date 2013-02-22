(function (global, undefined) {
	'use strict';

	require.config({
		waitSeconds: 20,
		paths: {
			// Core Libraries
			jquery: '../components/jquery/jquery',
			underscore: '../components/lodash/lodash',
			backbone: '../components/backbone/backbone',
			marionette: '../components/marionette/lib/backbone.marionette',
			handlebars: '../components/handlebars/handlebars',
			text: '../components/requirejs-text/text',

			// Shims
			// backboneShim: './Shims/Shim.Backbone',
			marionetteShim: './Shims/Shim.Marionette',
			// dushShim: './Shims/Shim.Dust',
			// Internal
			error: './Utils/ErrorInstance',
			dateUtils: './Utils/DateUtils',
			numberUtils: './Utils/NumberUtils',
			stringUtils: './Utils/StringUtils',
			tabletUtils: './Utils/TabletUtils',

			timeline: '../components/timelinejs/compiled/timeline',
			d3: '../components/d3/d3'
		},
		shim: {
			jquery: {
				exports: 'jQuery'
			},
			underscore: {
				exports: '_'
			},
			d3: {
				exports: 'd3'
			},
			marionette: {
				deps: ['jquery', 'underscore', 'backbone'],
				exports: 'Marionette'
			},
			backbone: {
				deps: ['underscore', 'jquery'],
				exports: 'Backbone'
			},
			handlebars: {
				exports: 'Handlebars'
			},
			easing: {
				deps: ['jquery']
			}
		}
	});

	var Environment = {};

	require(['jquery', './App', 'marionetteShim'], function ($, App) {
		$(function () {
			try {
				global.App = App;
				global.App.start(Environment);
			} catch(error) {

			}
		});
	});
}(window));