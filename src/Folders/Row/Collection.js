define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	return Backbone.Collection.extend({
		url: function(){
			return '/fe/api/transactions?folder=' + this.id;
		},
		initialize: function(options){
			this.id = options;
		},
		parse: function(data){
			return data.transactions;
		}
	});
});