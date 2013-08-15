var express = require('express');
var Repository = require('./lib/repository.js');

var repo = new Repository();

repo.on('ready', function(documents) {
  console.log(documents)
});

repo.collect();
