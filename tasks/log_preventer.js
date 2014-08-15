/*
 * grunt-log-preventer
 * https://github.com/lxlang/grunt-log-preventer
 *
 * Copyright (c) 2014 Tobias Lang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt, options) {

  var lib = {
    /**
     * Checks if this Module is enabled by options and cli-arguments
     *
     * +--------+--------+---------++--------+
     * |enabled | silent | verbose || active |
     * +========+========+=========++========+
     * |   0    |   0    |    0    ||    0   |
     * |   0    |   0    |    1    ||    0   |
     * |   0    |   1    |    0    ||    0   |
     * |   0    |   1    |    1    ||    0   |
     * |   1    |   0    |    0    ||    0   |
     * |   1    |   0    |    1    ||    0   |
     * |   1    |   1    |    0    ||    1   |
     * |   1    |   1    |    1    ||    0   |
     * +--------+--------+---------++--------+
     *
     * @returns {boolean}
     */
    checkModuleEnabled: function (enabled, silent, verbose) {
      return (enabled && silent && !verbose);

    },
    isModuleEnabled: function () {
      var enabled = options.enabled,
        silent = !(typeof(grunt.option('silent')) === 'string' && grunt.option('silent').toLowerCase() == 'off'),
        verbose = (grunt.option.flags('verbose') == '--verbose');

      return this.checkModuleEnabled(enabled, silent, verbose);
    }
  };

  var hooker = require('hooker'),
    _ = require('underscore');

  options = _.defaults(options, {
    enabled: false,
    ignore: []
  });

  if (lib.isModuleEnabled()) {
    grunt.log.ok('log preventer is enabled');

    var newline = true;

    var logHook = function (str) {
      str = String(str);
      if (newline) {
        if (str === '\n') {
          return hooker.preempt();
        }
      }

      options.ignore.forEach(function (pattern) {
        if (pattern.test(str)) {
          return hooker.preempt();
        }
      });

      newline = str.slice(-1) === '\n';
      return hooker.filter(this, [str]);
    };

    var objectsToHook = [
      process.stdout,
      process.stderr
    ];

    objectsToHook.forEach(function (objectToHook) {
      hooker.hook(objectToHook, 'write', logHook);
    });
  } else {
    grunt.log.ok('log preventer is NOT enabled');
  }

  return lib;
};
