let _ = require('lodash');

function GameController(managers) {
  this.gameMgr = managers.game;
}

GameController.prototype.loadGame = function (req, res, next) {
  req.checkParams('gameid', 'Invalid Game ID').notEmpty().isAlphanumeric();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + result.array());
    }

    let gameid = req.params.gameid;
    this.gameMgr.getGame(gameid).then(function (game) {
      _.set(req, 'info.game', game);
      next();
    });
  }.bind(this));
};

GameController.prototype.getGame = function (req, res) {
  let gameInfo = req.info.game;
  let allowedFields = ['id', 'gamenames', 'searchTerms', 'urls', 'timestamp'];

  let ret = _.pick(gameInfo, allowedFields);

  res.json(ret);
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

// GameController.prototype.addGamePriceRecord = function (req, res) {
//   // TODO::
//   throw new Error();
// };

module.exports = GameController;