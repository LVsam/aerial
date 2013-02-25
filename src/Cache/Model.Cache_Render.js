define(function (require){
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	/*
	 * CacheRenderModel
	 */

	var CacheRenderModel = Backbone.Model.extend({
	    defaults: {
		    count: 0
	    },
	    refreshBegin: function (){
		    this.set('count', this.get('count') + 1);
		    console.log('begin: ' + this.get('count'))
	    },
	    refreshComplete: function (){
		    this.set('count', this.get('count') - 1);
		    if (this.get('count') === 0) {
			    if (_.isFunction(this.get('callback'))) {
				    this.get('callback').call(this.get('view'));
			    }
			    debug.info('TRIGGERING VIEW REFRESH');
		    }
		    console.log('complete: ' + this.get('count'))
	    },
	    initialize: function (options){
		    var view = options.view;
		    var resources = options.resources;

		    _.extend(view, resources);
		    _.each(resources, function (resource, name){
			    view.bindTo(resource, 'cache:invalidated', resource.cacheEntry.refresh, resource.cacheEntry);
			    view.bindTo(resource, 'cache:refresh:begin', this.refreshBegin, this);
			    view.bindTo(resource, 'cache:refresh:complete', this.refreshComplete, this);
		    }, this);
	    }
	});
	return CacheRenderModel;
});
