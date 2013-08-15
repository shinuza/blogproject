var assert = require('assert');
var helpers = require('../lib/helpers');
var groupBy = helpers.groupBy;


test("groupBy function", function() {

  var groups = groupBy([
    {'name': 'John', 'sex': 'm'},
    {'name': 'Jane', 'sex': 'f'},
    {'name': 'Fred', 'sex': 'm'},
    {'name': 'Anna', 'sex': 'f'}
  ], function(item) {
    return item.sex;
  });

  assert.deepEqual(groups, {"m":[{"name":"John","sex":"m"},{"name":"Fred","sex":"m"}],"f":[{"name":"Jane","sex":"f"},{"name":"Anna","sex":"f"}]});

});

test("groupBy property", function() {

  var groups = groupBy([
    {'name': 'John', 'sex': 'm'},
    {'name': 'Jane', 'sex': 'f'},
    {'name': 'Fred', 'sex': 'm'},
    {'name': 'Anna', 'sex': 'f'}
  ], 'sex');

  assert.deepEqual(groups, {"m":[{"name":"John","sex":"m"},{"name":"Fred","sex":"m"}],"f":[{"name":"Jane","sex":"f"},{"name":"Anna","sex":"f"}]});

});
