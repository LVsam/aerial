define(function(require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

	// ANALYTICS CODE BC BACKBONE USES PRIVATE VARS
	var delegateEventSplitter = /^(\S+)\s*(.*)$/;
	var getValue = function(object, prop) {
			if(!(object && object[prop])) return null;
			return _.isFunction(object[prop]) ? object[prop]() : object[prop];
		};
	// ANALYTICS CODE BC BACKBONE USES PRIVATE VARS
	Backbone.View.prototype.delegateEvents = function(events) {
		if(!(events || (events = getValue(this, 'events')))) return;
		this.undelegateEvents();
		for(var key in events) {
			var method = events[key];
			if(!_.isFunction(method)) method = this[events[key]];
			if(!method) throw new Error('Method "' + events[key] + '" does not exist');
			var match = key.match(delegateEventSplitter);
			var eventName = match[1],
				selector = match[2];
			method = _.bind(method, this);

			// ANALYTICS EVENT
			var analyticsMethod = _.bind(function() {
				if(App && App.Analytics) {
					App.Analytics.dispatchEvent(arguments);
				}
				this.apply(this, arguments);
			}, method);
			// ANALYTICS EVENT
			eventName += '.delegateEvents' + this.cid;
			if(selector === '') {
				this.$el.bind(eventName, analyticsMethod);
			} else {
				this.$el.delegate(selector, eventName, analyticsMethod);
			}
		}
	};
	var _backbone_collection_prototype_reset = Backbone.Collection.prototype.reset;

	Backbone.Collection.prototype.reset = function(models, options) {
		options || (options = {});

		var id = (this.model && (new this.model()).idAttribute);

		if(!id || id === 'id') {
			return _backbone_collection_prototype_reset.call(this, models, options);
		}
		var ids = _(models).pluck(id);

		if(!options.partial) {
			// Remove Changed Models
			_.each(_.clone(this.models), function(model) {
				if(!_.include(ids, model.get(id))) {
					this.remove(model);
				}
			}, this);
		}

		// Update existing and Add new
		_.each(models, function(model, index) {
			var preexistent = this.get(model[id]);

			if(preexistent) {
				if(_.isFunction(preexistent._parse)) {
					preexistent.set(preexistent._parse(model));
				} else {
					preexistent.set(model);
				}

			} else {
				this.add(model, _.extend(options, {
					at: index
				}));
			}
		}, this);

		if(!options.silent && !options.partial) {
			this.trigger('reset', this, options);
		}
		return this;
	};

	return Backbone;
});