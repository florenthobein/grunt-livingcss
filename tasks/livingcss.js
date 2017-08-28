/*
 * grunt-livingcss
 * https://github.com/florenthobein/grunt-livingcss
 *
 * Copyright (c) 2017 Florent Hobein
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var async = require('async');
var livingcss = require('livingcss');
var path = require('path');
var minify = require('html-minifier').minify;

module.exports = function(grunt) {

	// Define custom livingcss preprocss
	function customPreprocess(dest, options, preprocessFunc) {
		return function(context, template, Handlebars) {

			// if no preprocess function then resolve a promise
			var preprocess = (preprocessFunc ?
				preprocessFunc(context, template, Handlebars) :
				Promise.resolve());
			
			// if the user returned anything but false we'll resolve a promise
			if (!(preprocess instanceof Promise)) {
				preprocess = (preprocess !== false ? Promise.resolve() : Promise.reject());
			}
			
			return preprocess
				.then(function() {
					
					// read the stylesheets from an absolute path so we're not trying to
					// read them from the livingcss directory
					var stylesheets = context.stylesheets.map(function(file) {
						return path.join( process.cwd(), dest || '.', file);
					});

					// inline all stylesheets for polymer shared styles to work
					// @see https://www.polymer-project.org/1.0/docs/devguide/styling#style-modules
					return livingcss.utils.readFiles(stylesheets, function(data, file) {
						context.parsedStylesheets = context.parsedStylesheets || [];
						context.parsedStylesheets.push(data);
					});
				})
				.then(function success() {
					
					// Generate HTML
					var html = Handlebars.compile(template)(context);
					if (options.minify) {
						html = minify(html, { collapseWhitespace: true });
					}

					// Create file
					grunt.file.write(path.join( process.cwd(), dest || '.', context.id + '.html'), html);
					grunt.log.writeln('File "' + context.id + '.html" created.');
					
					// reject this promise so livingcss doesn't create files
					return Promise.reject();
				})
				.catch(function(err) {
					if (err) {
						grunt.log.warn(err.message);
					}

					// reject this promise so livingcss doesn't create files
					return Promise.reject(err);
				});
		};
	}

	// Register the task
	grunt.registerMultiTask('livingcss', 'Grunt wrapper for the LivingCSS Style Guide Generator.', function() {

		// Asynchronous task
		var done = this.async();

		// Options
		var options = this.options({
			minify: false
		});
		options._squelchLogging = true;
		var preprocessFunc = options.preprocess;

		if (this.files.length < 1) {
			grunt.verbose.warn('No source files were provided.');
		}

		async.eachSeries(this.files, function(f, next) {

			// Filter non-existent files
			var src = f.src.filter(function(filepath) {
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			});

			// Continue if there is nothing to read in the source
			if (src.length === 0) {
				if (f.src.length < 1) {
					grunt.log.warn('No source files were found.');
				}
				return next();
			}

			// Process the files
			options.preprocess = customPreprocess(f.dest, options, preprocessFunc);
			livingcss(src, f.dest, options)
				.then(function() {
					next();
				})
				.catch(function(e) {
					grunt.log.warn(e.message);
					next();
				});

		}, function() {
			done();
		});

	});

};
