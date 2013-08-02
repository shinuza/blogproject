var util = require('util');
var path = require('path');
var fs = require('fs');

var marked = require('marked');
var express = require('express');
var app = express();

app.get('/posts', function() {
  res.end('ok');
});

app.get('/posts/:year', function(req, res) {
  res.end('ok');
});

app.get('/posts/:year/:month', function(req, res) {
  res.end('ok');
});

app.get('/posts/:year/:month/:day', function(req, res) {
  res.end('ok');
});

app.get('/posts/*', function(req, res) {
  var p = req.params[0];
  var fullpath = path.resolve('posts', p) + '.md';

  fs.stat(fullpath, function(err, stats) {
    if(stats) {
      fs.readFile(fullpath, function(err, buf) {
        if(buf) {
          var output = marked(buf.toString());
          res.header('content-type', 'text/html');
          res.end(output);
        } else {
          res.end('404');
        }
      });
    } else {
      res.end('404');
    }
  });

});

app.listen(3000);