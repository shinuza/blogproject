var path = require('path');
var util = require('util');
var events = require('events');
var glob = require('glob');
var Document = require('./document.js');
var helpers = require('./helpers.js');


var Repository = module.exports = function Repository(base, extension) {
  base = base || './documents';
  extension = extension || '.md';

  this.documents = [];
  this.globPattern = path.resolve(base, '**', '*' + extension);

  events.EventEmitter.call(this);
};

util.inherits(Repository, events.EventEmitter);

Repository.prototype.collect = function collect() {
  glob(this.globPattern, function(err, files) {
    if(err) {
      this.emit('error', err);
    } else {
      this.documents = files.map(Document);
      this.emit('ready', this.documents);
    }
  }.bind(this));
};

Repository.prototype.byYear = function byYear() {
  return helpers.groupBy(this.documents, function(document) {
    return document.ctime().getFullYear();
  });
};

