let _ = require('lodash');

function GameController(managers) {
  this.gameMgr = managers.game;
}

GameController.prototype.loadGame = function (req, res, next) {
  // TODO::
  throw new Error();
};

GameController.prototype.getGameList = function (req, res) {
  // TODO::
  throw new Error();
};

GameController.prototype.addGame = function (req, res) {
// TODO::
  throw new Error();
};

GameController.prototype.removeGame = function (req, res) {
// TODO::
  throw new Error();
};

GameController.prototype.addGameName = function (req, res) {
// TODO::
  throw new Error();
};

GameController.prototype.addGameSearhTerm = function (req, res) {
// TODO::
  throw new Error();
};

GameController.prototype.addGameURL = function (req, res) {
// TODO::
  throw new Error();
};

GameController.prototype.removeGameName = function (req, res) {
// TODO::
  throw new Error();
};

GameController.prototype.removeGameSearhTerm = function (req, res) {
// TODO::
  throw new Error();
};

GameController.prototype.removeGameURL = function (req, res) {
// TODO::
  throw new Error();
};

GameController.prototype.addGamePriceRecord = function (req, res) {
// TODO::
  throw new Error();
};

module.exports = GameController;