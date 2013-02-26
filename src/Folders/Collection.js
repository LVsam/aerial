define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	return Backbone.Collection.extend({
		url: '/fe/api/folders',
		parse: function(data){
			return data.folders;
		}
	});
});