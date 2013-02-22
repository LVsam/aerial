define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');

	var d3 = require('d3');
	var nv = require('nvd3');

	var template = require('text!Templates/netWorth.html');
	
	var data = require('./NetWorthJson');

	return Backbone.Marionette.ItemView.extend({
		template: template,
		initialize: function (options) {
			_.bindAll(this);
			this.options = options;

			this.init1();
		},
		init1: function () {

			var colors = d3.scale.category20();
			var keyColor = function (d, i) {
					return colors(d.key);
				};

			nv.addGraph(function () {
				var chart = nv.models.stackedAreaChart().x(function (d) {
					return d[0];
				}).y(function (d) {
					return d[1];
				}).clipEdge(true).color(keyColor);

				chart.xAxis.tickFormat(function (d) {
					return d3.time.format('%x')(new Date(d));
				});

				chart.yAxis.tickFormat(d3.format(',.2f'));

				d3.select('#chart').datum(data).transition().duration(500).call(chart);

				nv.utils.windowResize(chart.update);

				return chart;
			});
		}
	});
});