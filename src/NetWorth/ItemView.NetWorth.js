define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	var d3Lib = require('d3');
	var nvd3 = require('nvd3');

	var data = require('./NetWorthJson');

	var template = require('text!Templates/netWorth.html');
	// var template = 'NetWorth';
	return Backbone.Marionette.ItemView.extend({
		template: template,
		// className: 'f-inbox',
		initialize: function (options) {
			_.bindAll(this);
			this.options = options;

			this.initNvd3();
		},
		initNvd3: function () {

				nv.addGraph(function () {
					var chart = nv.models.stackedAreaChart().x(function (d) {
						return d[0]
					}).y(function (d) {
						return d[1]
					}).clipEdge(true);

					chart.xAxis.tickFormat(function (d) {
						return d3.time.format('%x')(new Date(d))
					});

					chart.yAxis.tickFormat(d3.format(',.2f'));

					d3.select('#chart svg').datum(data).transition().duration(500).call(chart);

					nv.utils.windowResize(chart.update);

					return chart;
				});
		}
	});
});