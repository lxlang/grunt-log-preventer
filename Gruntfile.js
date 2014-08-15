/*
 * grunt-log-preventer
 * https://github.com/lxlang/grunt-log-preventer
 *
 * Copyright (c) 2014 Tobias Lang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  require('./tasks/log_preventer.js')(grunt, {
      prefix: true
    });
  
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    log_preventer: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      },
      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!'
        },
        files: {
          'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

  grunt.registerTask('info', function(prefix) {
    grunt.log.ok('ok log');
    grunt.verbose.ok('ok log verbose');
    
    grunt.verbose.warn('verbose warn');
    grunt.log.warn('nonverbose warn');
    
    grunt.fail.warn('fail warn');
  });
};
