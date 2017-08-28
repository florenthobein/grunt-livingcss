/*
 * grunt-livingcss
 * https://github.com/florenthobein/grunt-livingcss
 *
 * Copyright (c) 2017 Florent Hobein
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc',
				reporterOutput: '',
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		livingcss: {
			output: {
				files: {
					'tmp/output1/': 'test/fixtures/section1.css',
					'tmp/output2/': ['test/fixtures/section1.css'],
					'tmp/output3/': ['test/fixtures/section1.css', 'test/fixtures/pages.css', 'test/fixtures/empty.css']
				}
			},
			transmit_options: {
				options: {
					template: 'test/fixtures/section1.css'
				},
				files: {
					'tmp/section1/': 'test/fixtures/section2.css'
				}
			},
			preprocess: {
				options: {
					preprocess: function(context, template, Handlebars) {
						context.title = 'Preprocess';
					}
				},
				files: {
					'tmp/output4/': 'test/fixtures/section1.css'
				}
			},
			pages: {
				files: {
					'tmp/output5/': ['test/fixtures/pages.css']
				}
			},
			empty: {
				files: {
					'tmp/empty/': ['test/fixtures/empty.css']
				}
			},
			error: {
				files: {
					'tmp/error/': ['test/fixtures/undefined-section.css']
				}
			},
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['jshint', 'clean', 'livingcss', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
