define(function (require) {
	'use strict';

	var _ = require('underscore');
	var ErrorInstance = require('error');
	var Cacheable = require('./Cache/Cacheable');

	var Settings = require('./Cache/Cache.Setup');
	var CacheEntry = require('./Cache/Cache.Entry');
	var CacheRenderModel = require('./Cache/Model.Cache_Render');

	/*
	 * CacheManager manages CRUD for MYLV
	 *
	 * All requests should be written towards this facade, as it will automatically handle cache invalidation
	 * dependencies and trigger auto gets.
	 *
	 * EXAMPLE:
	 *
	 * ::App.Environment.js:: :: Append your service to the App.Environment services for your chosen environment <pre>
	 * services: { ... folders: 'folders' ... } </pre>
	 *
	 * ::App.CacheManager.js:: :: Append your collection constructor into the map <pre> var Folders =
	 * require('../Folders/Collection.Folders');
	 *
	 * ... collectionMap: { ... folder: Folders, ... }
	 *
	 * </pre>
	 *
	 * <pre> var CacheableCollection = require('Shared/Cacheable/Collection.Cacheable'); return
	 * CacheableCollection.extend({ initialize: function(){ this.register('folders'); } }); </pre>
	 *
	 * <pre> this.collection = App.CacheManager.getCollection('folders', {folder: 123}); </pre>
	 */

	function Cache(options) {
		_.extend(this, options.environment.cache);
		this.cache = {};
		return this;
	}
	Cache.prototype = _.extend(Settings, {
		/*
		 * InvalidateAll
		 */
		invalidateAll: function () {
			_.each(this.cache, function (entry, key) {
				entry.invalidate();
			}, this);
			return this;
		},
		/*
		 * InvalidateDependencies
		 */
		invalidateDependencies: function (method, service) {
			if(!this.invalidateMap.hasOwnProperty(service)) {
				throw new ErrorInstance('InvalidServiceDependencyError', service + ' is not a valid service');
			}
			var dependentSections = this.invalidateMap[service];
			_.each(this.cache, function (entry, key) {
				if(dependentSections.hasOwnProperty(entry.service)) {
					entry.invalidate();
				}
			});
			return this;
		},
		/*
		 * InvalidateService
		 */
		invalidateService: function (service) {
			_.each(this.cache, function (entry, key) {
				if(entry.service === service) {
					entry.invalidate();
				}
			});
			return this;
		},
		/*
		 * RefreshEntry
		 */
		refreshEntry: function (name, params) {
			var hash = this._generateHash(name, params);
			if(this.cache.hasOwnProperty(hash)) {
				this.cache[hash].refresh();
			}
			return this;
		},
		/*
		 * Refresh
		 */
		refresh: function () {
			_.each(this.cache, function (entry, key) {
				if(!entry.valid) {
					entry.refresh();
				}
			});
			return this;
		},
		/*
		 * Flush
		 */
		flush: function (name, params) {
			var hash = this._generateHash(name, params);
			if(this.cache.hasOwnProperty(hash)) {
				this.cache[hash].invalidate();
				delete this.cache[hash];
			}
			return this;
		},
		/*
		 * Invalidate
		 */
		invalidate: function (name, params) {
			var hash = this._generateHash(name, params);
			if(this.cache.hasOwnProperty(hash)) {
				this.cache[hash].invalidate();
			}
			return this;
		},
		/*
		 * RequestFromServer
		 *
		 * Makes a request from the server by first constructing the model or collection, then issuing a fetch
		 */
		_requestFromServer: function (Constructor, name, params, success, error) {
			if(!Constructor) {
				throw new ErrorInstance('CacheConstructorNotFound', 'Could not locate constructor for ' + name);
			}
			var resource = new Constructor();
			resource.setQueryParams(params || {});
			resource.serverRead({
				success: success || this._noop,
				error: error || this._noop
			});
			return resource;
		},
		_noop: function () {},
		/*
		 * Get
		 */
		get: function (name, params, success, error) {
			var hash = this._generateHash(name, params);
			var cached = this.enabled && this.cache.hasOwnProperty(hash);
			var resource, cacheEntry;

			var logCache = cached;
			if(!cached) {
				resource = this._requestFromServer(this.ConstructorMap[name], name, params, success, error);
				this.cache[hash] = new CacheEntry(name, resource);
			} else {
				cacheEntry = this.cache[hash];
				resource = cacheEntry.entry;
				if(!cacheEntry.valid) {
					cacheEntry.refresh();
					cached = false;
				}
			}
			if(!logCache) {
				this._log('GET ' + (logCache ? '(cached)' : '(SERVER)'), name, resource);
			}
			return resource;
		},
		/*
		 * _log
		 */
		_log: function (method, name, entry) {
			var padding = '                     ';
			var url = _.isFunction(entry.urlRead) ? entry.urlRead() : entry.url();

			var left = Math.floor((16 - name.length) / 2);
			var right = (name.length % 2) ? left + 1 : left;
			name = padding.split('', left).join('') + name + padding.split('', right).join('');

			debug.info(['<CACHE> ' + method, name, url].join(' : '));
		},
		/*
		 * _generateHash
		 *
		 * TODO: it is possible that flattenQueryParams could generate two different hashes for the same collection if
		 * the params evaluated in a different order
		 */
		_generateHash: function (name, params) {
			return name + '|' + Cacheable.flattenQueryParams(params || {});
		},

		/*
		 * Register
		 */
		register: function (view, resources, callback) {
			view.cacheRenderModel = new CacheRenderModel({
				view: view,
				resources: resources,
				callback: callback
			});
		}
	});
	return Cache;
});