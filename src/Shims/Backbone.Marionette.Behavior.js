// EXAMPLE
//  Marionette.View.behavior( BehaviorA, BehaviorB, {
// 	initialize: function(){
// 		this.startup()
// 	}
// });
define(function(require) {
	'use strict';

	var _ = require('underscore');
	var Backbone = require('backbone');

	var behavior =  function() {
		var behaviors = Array.prototype.slice.call(arguments);
		var retVal = {
			ui: {},
			triggers: {}
		};
		var callbacks = [];
		_.each(behaviors, function(behavior) {
			if(behavior.ui) {
				_.extend(retVal.ui, behavior.ui || {});
				delete behavior.ui;
			}
			if(behavior.triggers) {
				_.extend(retVal.triggers, behavior.triggers || {});
				delete behavior.triggers;
			}
			if(_.isFunction(behavior.initialize)) {
				callbacks.push(behavior.initialize);
				delete behavior.initialize;
			}
		});
		retVal.initialize = function() {
			var len = callbacks.length;
			while(len--){
				callbacks[len].apply(this, arguments);
			}
		};
		behaviors.unshift(retVal);

		return Backbone.View.extend.apply(this, behaviors);
	}
	return behavior;
});
