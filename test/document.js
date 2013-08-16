var assert = require('assert');
var path = require('path');

var Document = require('../lib/document.js');

function doc() {
  return new Document(path.resolve(__dirname, './sandbox/documents/something-something-dark-side.md'));
}

suite('Meta');

test('parsing', function() {
  assert.notDeepEqual(doc()._meta, {});
});