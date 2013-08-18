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
  assert.equal(metadoc().ctime().getTime(), 1357043820000);
});

test('updated date', function() {
  assert.equal(metadoc().mtime().getTime(), 1387971240000);
});

test('author', function() {
  assert.deepEqual(metadoc().author(), ['John Doe', 'Jane Doe']);
});

test('keywords', function() {
  assert.deepEqual(metadoc().keywords(), ["blog","test","anything","goes"]);
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

test('keywords', function() {
  assert.deepEqual(plaindoc().keywords(), []);
});