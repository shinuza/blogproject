var fs = require('fs');
var marked = require('marked');
var Meta = require('./meta.js');


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

  _parseMeta: function _parseMeta() {
    var meta = new Meta()
      , firstToken = this._tokens[0]
      , links = this._tokens.links;

    if(firstToken && firstToken.type == 'paragraph') {
      // Remove the meta paragraph
      this._tokens = this._tokens.slice(1);
      this._tokens.links = links;

      meta.parse(firstToken.text);
    }

    return meta;
  },

  _documentTitle: function _documentTitle() {
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

  title: function title() {
    return this._meta.get('title', this._documentTitle());
  },

  ctime: function ctime() {
    return this._meta.get('date', this._stat.ctime);
  },

  mtime: function mtime() {
    return this._meta.get('updated', this._stat.mtime);
  },

  author: function author() {
    return this._meta.get('author', []);
  },

  keywords: function keywords() {
    return this._meta.get('keywords', []);
  },

  html: function html() {
    return marked.parser(this._tokens);
  },

  markdown: function markdown() {
    return this.raw;
  },

  toJSON: function toJSON() {
    return {
      title: this.title(),
      ctime: this.ctime(),
      mtime: this.mtime()
    }
  }
};