var express = require('express');

module.exports = function (controllers) {
  var game = express();

  game.post('/game', function (req, res) {

  });
  game.delete('/game', function (req, res) {

  });
  game.get('/games/', function (req, res) {

  });
  game.get('/game/:gameid', function (req, res) {

  });
  game.patch('/game/:gameid', function (req, res) {

  });

  return game;
};