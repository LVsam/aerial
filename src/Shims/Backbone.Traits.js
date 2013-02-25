// EXAMPLE
//  Marionette.View.trait( traitA, traitB, {
// 	initialize: function(){
// 		this.startup()
// 	}
// });
define(function(require) {
	'use strict';

	var _ = require('underscore');
	var Backbone = require('backbone');

	var withTraits =  function() {
		var traits = Array.prototype.slice.call(arguments);
		var retVal = {
			ui: {},
			triggers: {}
		};
		var callbacks = [];
		_.each(traits, function(trait) {
			if(trait.ui) {
				_.extend(retVal.ui, trait.ui || {});
				delete trait.ui;
			}
			if(trait.triggers) {
				_.extend(retVal.triggers, trait.triggers || {});
				delete trait.triggers;
			}
			if(_.isFunction(trait.initialize)) {
				callbacks.push(trait.initialize);
				delete trait.initialize;
			}
		});
		retVal.initialize = function() {
			var len = callbacks.length;
			while(len--){
				callbacks[len].apply(this, arguments);
			}
		};
		traits.unshift(retVal);

		return Backbone.View.extend.apply(this, traits);
	};
	return Backbone;
});
