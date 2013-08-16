var assert = require('assert');
var path = require('path');

var Document = require('../lib/document.js');

function metadoc() {
  return new Document(path.resolve(__dirname, './sandbox/documents/meta-document.md'));
}

function plaindoc() {
  return new Document(path.resolve(__dirname, './sandbox/documents/plain-document.md'));
}

function type(obj) {
  return Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1];
}


suite('Meta');

test('parsing', function() {
  assert.notDeepEqual(metadoc()._meta, {});
});

test('title', function() {
  assert.equal(metadoc().title(), 'A different title');
});

test('created date', function() {
  assert.equal(metadoc().ctime(), '1 January, 2013 13:37');
});

test('updated date', function() {
  assert.equal(metadoc().mtime(), '25 December, 2013 12:34');
});

test('author', function() {
  assert.deepEqual(metadoc().author(), ['John Doe', 'Jane Doe']);
});

suite('Plain');

test('title', function() {
  assert.equal(plaindoc().title(), 'A plain document title');
});

test('created date', function() {
  assert.equal(type(plaindoc().ctime()), 'Date');
});

test('updated date', function() {
  assert.equal(type(plaindoc().mtime()), 'Date');
});

test('author', function() {
  assert.deepEqual(plaindoc().author(), []);
});