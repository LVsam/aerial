define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	var template = require('text!Templates/Folders.html');
	
	var Row = require('./Row/Itemview.Row');

	var FoldersCollection = require("./Collection");

	return Backbone.Marionette.CompositeView.extend({
		template: template,
		itemView: Row,
		initialize: function (options) {
			_.bindAll(this);
			this.options = options;

			this.collection = new FoldersCollection();
			this.collection.fetch();
		}
	});
});