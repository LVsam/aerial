define(function(require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');

	function CacheEntry(name, entry) {
		entry.cacheEntry = this;
		this.name = name;
		this.entry = entry;
		this.isValid = true;
		this.isRefreshing = false;
		this.service = entry.service;
	}

	CacheEntry.prototype = {
		evict: function() {
			App.CacheManager._log('  EVICTION  ', this.name, this.entry);
			this.isValid = false;
			this.entry.trigger('cache:evicted');
			this.entry = null;
			return this;
		},
		invalidate: function() {
			// console.log('::INVALIDATE::', this.name, this.entry.url(), 'valid:' + this.isValid, 'refresh:' + this.isRefreshing)
			if(this.isValid && !this.isRefreshing) {
				App.CacheManager._log(' INVALIDATE ', this.name, this.entry);
				this.isValid = false;
				this.entry.trigger('cache:invalidated');
			}
			return this;
		},
		validate: function(){
			this.isValid = true;
			this.isRefreshing = false;
		},
		refresh: function() {
			// console.log('::REFRESH:::', this.name, this.entry.url(), 'valid:' + this.isValid, 'refresh:' + this.isRefreshing)
			if(!this.isValid && !this.isRefreshing) {
				App.CacheManager._log('  RE-FRESH  ', this.name, this.entry);
				// console.log('REFRESHINGG' + this.entry.url(), this.entry.queryParams);

				this.isRefreshing = true;
				this.entry.trigger('cache:refresh:begin');

				var self = this;
				$.when(this.entry.serverRead()).then(function() {
					self.isValid = true;
					self.isRefreshing = false;
					self.entry.trigger('cache:refresh:complete');
				});
			}
			return this;
		}
	};
	return CacheEntry;
});