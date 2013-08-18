var assert = require('assert');
var resolve = require('path').resolve;

var Repository = require('../lib/repository.js');

function repo(path, extension) {
  return new Repository(resolve(__dirname, path), extension);
}

suite('Repository');

test('searching', function(done) {
  var r = repo('./sandbox');
  r.on('ready', function(documents) {
    assert.equal(documents.length, 2);
    done();
  });
  r.collect();
});

test('searching wrong dir', function(done) {
  var r = repo('../lib');
  r.on('ready', function(documents) {
    assert.equal(documents.length, 0);
    done();
  });
  r.collect();
});
