var fs = require('fs');
var marked = require('marked');

var KEY_VALUE = /^(\w+)\:\s+?(.*)/;

var Document = module.exports = function Document(filename) {
  if(!(this instanceof Document)) {
    return new Document(filename);
  }

  this.filename = filename;
  this.raw = fs.readFileSync(this.filename).toString();

  this._tokens = marked.lexer(this.raw);
  this._stat = fs.statSync(filename);
  this._meta = this._parseMeta();
};

Document.prototype = {

  _parseHash: function _parseHash(metaText) {
    var obj = {};

    metaText.split('\n').forEach(function(line) {
      var m = line.match(KEY_VALUE);

      if(m) {
        obj[m[1].toLowerCase()] = m[2].trim();
      }
    });

    return obj;
  },

  _parseMeta: function _parseMeta() {
    var ret
      , firstToken = this._tokens[0]
      , links = this._tokens.links;

    if(firstToken && firstToken.type == 'paragraph') {
      // Remove the meta paragraph
      this._tokens = this._tokens.slice(1);
      this._tokens.links = links;

      ret = this._parseHash(firstToken.text);
    }

    return ret;
  },

  title: function title() {
    var node
      , i = 0
      , l = this._tokens.length;

    for(; i < l; i++) {
      node = this._tokens[i];
      if(node.type === 'heading') {
        return node.text;
      }
    }

    return '';
  },

  ctime: function ctime() {
    return this._stat.ctime;
  },

  mtime: function mtime() {
    return this._stat.mtime;
  },

  toJSON: function toJSON() {
    return {
      title: this.title(),
      ctime: this.ctime(),
      mtime: this.mtime()
    }
  },

  html: function html() {
    return marked.parser(this._tokens);
  },

  markdown: function markdown() {
    return this.raw;
  }
};