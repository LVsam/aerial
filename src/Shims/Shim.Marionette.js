define(function(require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Handlebars = require('handlebars');

	var ErrorInstance = require('error');


	// Override Marionette to use Handlebars Templates
	Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(template) {
		if(!template || template.length === 0) {
			throw new ErrorInstance('NoTemplateError', 'Could not find template: "' + template + '"');
		}
		return template;
	};
	Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
		return Handlebars.compile(rawTemplate);
	};

	return Backbone.Marionette;
});