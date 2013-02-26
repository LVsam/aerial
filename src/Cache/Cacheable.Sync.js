define(function (require){
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var methodMap = {
	    'create': 'POST',
	    'update': 'PUT',
	    'delete': 'DELETE',
	    'read': 'GET'
	};

	var getValue = function (object, prop){
		if (!(object && object[prop])) {
			return null;
		}
		return _.isFunction(object[prop]) ? object[prop]() : object[prop];
	};
	var urlError = function (){
		throw new Error('A "url" property or function must be specified');
	};

	// Override this function to change the manner in which Backbone persists
	// models to the server. You will be passed the type of request, and the
	// model in question. By default, makes a RESTful Ajax request
	// to the model's `url()`. Some possible customizations could be:
	//
	// * Use `setTimeout` to batch rapid-fire updates into a single request.
	// * Send up the models as XML instead of JSON.
	// * Persist models via WebSockets instead of Ajax.
	//
	// Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
	// as `POST`, with a `_method` parameter containing the true HTTP method,
	// as well as all requests with the body as `application/x-www-form-urlencoded`
	// instead of `application/json` with the model in a param named `model`.
	// Useful when interfacing with server-side languages like **PHP** that make
	// it difficult to read the body of `PUT` requests.
	return function (method, model, options){
		var type = methodMap[method];

		// Default options, unless specified.
		
		if(!options){
			options = {};
		}

		// Default JSON-request options.
		var params = {
		    type: type,
		    dataType: 'json'
		};

		// Ensure that we have a URL.
		if (!options.url) {
			params.url = getValue(model, 'url') || urlError();
		}

		// Ensure that we have the appropriate request data.
		if (!options.data && model && (method === 'create' || method === 'update')) {
			params.contentType = 'application/json';
			params.data = JSON.stringify(model.toJSON());
		}

		// Don't process data on a non-GET request.
		if (params.type !== 'GET' && !Backbone.emulateJSON) {
			params.processData = false;
		}

		// Make the request, allowing the user to override any Ajax options.
		return $.ajax(_.extend(params, options));
	};
});