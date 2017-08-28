[![Build Status](https://travis-ci.org/florenthobein/grunt-livingcss.svg?branch=master)](https://travis-ci.org/florenthobein/grunt-livingcss)

# grunt-livingcss

> Grunt wrapper for the LivingCSS Style Guide Generator.
> 
> *Issues with the output should be reported on the LivingCSS [github repo](https://github.com/straker/livingcss/issues).*

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-livingcss --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-livingcss');
```

## The "livingcss" task

### Overview
In your project's Gruntfile, add a section named `livingcss` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  livingcss: {
    options: {
      minify: true,
    },
    files: {
      'dest/': ['src/**/*.css']
    },
  },
});
```

### Options

See the LivingCSS [options](https://github.com/straker/livingcss#options).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).