var path = require('path');
var util = require('util');
var events = require('events');

var glob = require('glob');
var Post = require('./post.js');


var Repository = module.exports = function Repository(base, extension) {
  base = base || './documents';
  extension = extension || '.md';

  this.globPattern = path.resolve(base, '**', '*' + extension);

  events.EventEmitter.call(this);
};

util.inherits(Repository, events.EventEmitter);

Repository.prototype.collect = function collect() {
    glob(this.globPattern, function(err, files) {
      if(err) {
        this.emit('error', err);
      } else {
        this.emit('ready', files.map(Post));
      }
    }.bind(this));
};
