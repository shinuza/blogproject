var assert = require('assert');
var resolve = require('path').resolve;

var Repository = require('../lib/repository.js');

function repo(path, extension, fn) {
  var r = new Repository(resolve(__dirname, path), extension);
  r.on('ready', fn);
  r.collect();
}

suite('Repository');

test('searching', function(done) {
  repo('./sandbox', null, function(documents) {
    assert.equal(documents.length, 2);
    done();
  });
});

test('searching wrong dir', function(done) {
  repo('../lib', null, function(documents) {
    assert.equal(documents.length, 0);
    done();
  });
});
