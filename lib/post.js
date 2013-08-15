var fs = require('fs');

var marked = require('marked');

var Post = module.exports = function Post(filename) {
  this.filename = filename;
  this.raw = fs.readFileSync(this.filename).toString();

  this._tokens = marked.lexer(this.raw);
  this._stat = fs.statSync(filename);
};

Post.prototype = {

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