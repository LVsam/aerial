define(function (require){
	'use strict';

	var _ = require('underscore');

	// Models


	// Collections


	return {
	    /*
		 * ConstructorMap holds the Constructor functions for each cacheable items
		 */
	    ConstructorMap: {
	        // Collections


	        // Models
	
	    },
	    /*
		 * InvalidationMap maps all the dependencies
		 */
	    invalidateMap: (function (map){
		    var result = {};
		    var reduceFn = function (memo, item){
			    memo[item] = true;
			    return memo;
		    };
		    for ( var i in map) {
			    if (map.hasOwnProperty(i)) {
				    result[i] = _.reduce(map[i], reduceFn, {});
			    }
		    }
		    return result;
	    }({
	        
	    }))
	};
});
