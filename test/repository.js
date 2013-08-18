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
    assert.equal(documents.length, 3);
    done();
  });
});

test('searching wrong dir', function(done) {
  repo('../lib', null, function(documents) {
    assert.equal(documents.length, 0);
    done();
  });
});

test('searching wrong ext', function(done) {
  repo('./sandbox', '.rst', function(documents) {
    assert.equal(documents.length, 0);
    done();
  });
});

test('fetching all document by years', function(done) {
  repo('./sandbox', null, function(documents) {
    assert.deepEqual(Object.keys(this.byYear()), ['2010', '2013']);
    done();
  });
});