var express = require('express');
var Repository = require('./lib/repository.js');

var repo = new Repository();

repo.on('ready', function(posts) {
  console.log(posts)
});

repo.collect();
