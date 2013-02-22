define(['handlebars'], function (Handlebars){
	'use strict';

	return {
		load: function (name, parentRequire, load, config){
			parentRequire([("text!" + name)], function (templateContent){
				var template = Handlebars.compile(templateContent);
				load(template);
			});
		}
	// load: function (name, parentRequire, load, config){
	//
	// load.asText('hb!' + name, 'define(["handlebars"], function(H){ return H.template(H.precompile(tmplText));})');
	//
	// parentRequire(['hb!' + name], function (val){
	// load(val);
	// });
	// }
	};

	// var a = {
	// load: function (name, parentRequire, load, config){
	//
	// load.asText('hb!' + name, 'define(["handlebars"], function(H){ return H.template(H.precompile(tmplText));})');
	//
	// parentRequire(['hb!' + name], function (val){
	// load(val);
	// });
	// }
	// }
});
