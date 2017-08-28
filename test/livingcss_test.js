'use strict';

var grunt = require('grunt');

var read = function(src) {
  return grunt.util.normalizelf(grunt.file.read(src));
};

exports.livingcss = {

	// it should output with LivingCSS
	output: function(test) {
		test.expect(5);

		var actual = read('tmp/output1/index.html');
		test.ok(/Section1/.test(actual), 'should output with LivingCSS');

		actual = read('tmp/output2/index.html');
		test.ok(/Section1/.test(actual), 'should output with LivingCSS');

		actual = read('tmp/output3/index.html');
		test.ok(/Section1/.test(actual), 'should concat output when passed an array');

		actual = read('tmp/output3/page-1.html');
		test.ok(/Page/.test(actual), 'should concat output when passed an array');

		actual = read('tmp/output3/page-2.html');
		test.ok(/Page/.test(actual), 'should concat output when passed an array');

		test.done();
	},

	// it should pass options to LivingCSS
	transmit_options: function(test) {
		test.expect(1);

		var actual = read('tmp/section1/index.html');
		var expected = read('test/expected/section1.css');
		test.equal(actual, expected, 'should pass options to LivingCSS');

		test.done();
	},

	// it should still run the preprocess function
	preprocess: function(test) {
		test.expect(1);

		var actual = read('tmp/output4/index.html');
		test.ok(/Preprocess/.test(actual), 'should still run the preprocess function');

		test.done();
	},

	// it should add multiple pages to the stream
	pages: function(test) {
		test.expect(1);

		var file_nb = 0;
		grunt.file.recurse('tmp/output5/', function() {
			file_nb++;
		});

		test.equal(file_nb, 2, 'it should add multiple pages to the stream');

		test.done();
	},

	// it should complete when no files have JSDoc like comments
	empty: function(test) {
		test.expect(1);

		test.equal(grunt.file.exists('tmp/empty/'), false, 'it should complete when no files have JSDoc like comments');

		test.done();
	},

	// it should not process files with errors
	throw_error: function(test) {
		test.expect(1);

		test.equal(grunt.file.exists('tmp/error/'), false, 'should not process files with errors');

		test.done();
	}
};
