let _ = require('lodash');
let GameModel = require('../models/game');

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
  let allowedFields = ['id', 'gamenames', 'searchTerms', 'urls', 'timestamp'];

  this.gameMgr.getGames().then(function (games) {
    let ret = _.map(games, (game) => {
      return _.pick(gameInfo, allowedFields);
    });

    res.json(ret);
  }.bind(this));
};

GameController.prototype.addGame = function (req, res) {
  req.checkBody('gamename', 'Invalid Gamename').notEmpty().isAlphanumeric();
  req.checkBody('gamenameEn', 'Invalid English Gamename').isAlphanumeric();
  req.checkBody('gamenameKr', 'Invalid Korean Gamename').isAlphanumeric();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + result.array());
    }

    let gamename = req.body.gamename;
    let gamenameEn = req.body.gamenameEn;
    let gamenameKr = req.body.gamenameKr;

    let created = new GameModel(null, gamename, gamenameEn, gamenameKr, [], [], new Date(Date.now()));

    this.gameMgr.upsertGame(created)
      .then((saved) => {
        return res.json(saved.id);
      });
  }.bind(this));
};

GameController.prototype.removeGame = function (req, res) {
  let gameInfo = req.info.game;
  let idToDelete = gameInfo.id;

  this.gameMgr.deleteGame(idToDelete).then((deletedID) => {
    return res.json(deletedID);
  });
};

GameController.prototype.addGameName = function (req, res) {
  req.checkBody('gamename', 'Invalid Gamename').isNotEmpty().isAlphanumeric();
  req.checkBody('alias', 'Invalid Gamename Alias').isNotEmpty().isAlphanumeric();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + result.array());
    }

    let gameInfo = req.info.game;

    let allowedFields = ['gamename'];

    // update fields
    // TODO::
    throw new Error('Not Implemented yet');


    this.gameMgr.upsertGame(updated)
      .then((saved) => {
        return res.json(saved.id);
      })
      .catch((err) => {
        return res.status(500).json({ msg: `Updating game failed ${err.message}` });
      });
  }.bind(this));
};

GameController.prototype.addGameSearhTerm = function (req, res) {
  req.checkBody('term', 'Invalid Term').isNotEmpty().isAlphanumeric();
  req.checkBody('type', 'Invalid Market Type for Search Terms').isNotEmpty().isAlphanumeric();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + result.array());
    }

    let gameInfo = req.info.game;

    let allowedFields = ['searchTerms'];

    // update fields
    // TODO::
    throw new Error('Not Implemented yet');


    this.gameMgr.upsertGame(updated)
      .then((saved) => {
        return res.json(saved.id);
      })
      .catch((err) => {
        return res.status(500).json({ msg: `Updating game failed ${err.message}` });
      });
  }.bind(this));
};

GameController.prototype.addGameURL = function (req, res) {
  req.checkBody('url', 'Invalid URL').isNotEmpty().isURL();
  req.checkBody('type', 'Invalid Market Type').isNotEmpty().isAlphanumeric();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + result.array());
    }

    let gameInfo = req.info.game;

    let allowedFields = ['urls'];

    // update fields
    // TODO::
    throw new Error('Not Implemented yet');


    this.gameMgr.upsertGame(updated)
      .then((saved) => {
        return res.json(saved.id);
      })
      .catch((err) => {
        return res.status(500).json({ msg: `Updating game failed ${err.message}` });
      });
  }.bind(this));
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