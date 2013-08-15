var assert = require('assert');
var path = require('path');

var Document = require('../lib/document.js');

test("meta parsing", function() {

  var doc = new Document(path.resolve(__dirname, './sandbox/documents/something-something-dark-side.md'));
  assert.deepEqual(doc._meta, null);

});