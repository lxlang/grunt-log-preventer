var grunt = require('grunt'),
  assert = require('assert'),
  lib = require('../tasks/log_preventer')(grunt, {});

describe('basic logic', function() {
  it('Test for correct enabled module', function() {
    assert.equal(lib.checkModuleEnabled(false, false, false), false);
    assert.equal(lib.checkModuleEnabled(false, false, true ), false);
    assert.equal(lib.checkModuleEnabled(false, true , false), false);
    assert.equal(lib.checkModuleEnabled(false, true , true ), false);
    assert.equal(lib.checkModuleEnabled(true , false, false), false);
    assert.equal(lib.checkModuleEnabled(true , false, true ), false);
    assert.equal(lib.checkModuleEnabled(true , true , false), true );
    assert.equal(lib.checkModuleEnabled(true , true , true ), false);
  });

});