define(function( require ) {
    "use strict";

        //libs
    var $ = require('jquery');

        //mv*


	App.Utils = {
		getObjLength : function( obj ){
			var count = 0;
			for (var i in obj) {
				if (obj.hasOwnProperty(i)) {
					count++;
				}
			}
			return count;
		},

		ui:  {
			loader: "<img class='loader' src='mylv/img/loading.gif'/>"
		}
	}

    


    return Utils;
});
