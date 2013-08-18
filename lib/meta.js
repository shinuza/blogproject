var KEY_VALUE = /^(\w+)\:\s+?(.*)/;

var Meta = module.exports = function Meta() {
  this.obj = {};
};

Meta.Schema = {
  title: identity,
  author: split,
  date: date,
  updated: date,
  keywords: split
};

Meta.prototype = {

  parse: function parse(text) {
    text.split('\n').forEach(function(line) {
      var m = line.match(KEY_VALUE)
        , key, value, fn;

      if(m) {
        key = m[1].toLowerCase();
        value = m[2].trim();
        fn = Meta.Schema[key] || identity;

        this.obj[key] = fn(value);
      }
    }, this);
  },

  get: function get(key, def) {
    return key in this.obj ? this.obj[key] : def;
  }

};

function date(text) {
  return new Date(Date.parse(text));
}

function split(text) {
  return text.split(',').map(function(text) {
    return text.trim();
  })
}

function identity(text) {
  return text;
}