define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Dust = require('dust');
	var Handlebars = require('handlebars');

	var ErrorInstance = require('error');

	// Override Marionette to use Handlebars Templates
	Backbone.Marionette.TemplateCache.prototype.loadTemplate = function (templateName) {
		var template = require('Text!Templates/Template.' + templateName + '.html');
		if(!template || template.length === 0) {
			throw new ErrorInstance('NoTemplateError', 'Could not find template: "' + template + '"');
		}
		return template;
	};
	Backbone.Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
		return Handlebars.compile(rawTemplate);
	};

	// Override Marionette to use Handlebars Templates
	// Backbone.Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {
	// 	debugger;
	// 	var template = require('Text!Templates/Template.' + templateId);
	// 	if(!template || template.length === 0) {
	// 		throw new ErrorInstance('NoTemplateError', "Could not find template: '" + templateId + "'");
	// 	}
	// 	return template;
	// };
	// Backbone.Marionette.TemplateCache.prototype.compileTemplate = function (template) {
	// 	return Dust.compile(template, this.templateId);
	// };
	// Backbone.Marionette.Renderer.render = function (template, data) {
	// 	var html;
	// 	// Callback will run sync if templates pre-compiled into dust cache
	// 	Dust.render(template, data, function (err, out) {
	// 		html = out;
	// 	});
	// 	console.log(html)
	// 	return html;
	// };
	return Backbone.Marionette;
});