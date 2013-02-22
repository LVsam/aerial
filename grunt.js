/*
 * Grunt Config
 *
 */
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		'pkg': '<json:package.json>',
		'clean': {
			build: ['build/build.min.js', 'build/build.min.css'],
			sass: ['.sass-cache']
		},
		'cssmin': {
			dist: {
				src: ['resources/css/screen.css'],
				dest: 'resources/css/screen.min.css'
			}
		},
		'compass': {
			dev: {
				config: 'config.rb',
				forcecompile: true
			}
		},
		bower: {
			dev: {
				dest: 'components/'
			}
		}
	});
	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-compass');
	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-sitemap');
	grunt.loadNpmTasks('grunt-yui-compressor');

	grunt.registerTask('default', 'clean min compass-clean compass:dev cssmin clean:sass');
};