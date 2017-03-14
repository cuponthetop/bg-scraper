let _ = require('lodash');
let GameModel = require('../models/game');

function GameController(managers) {
  this.gameMgr = managers.game;
};

GameController.prototype.loadGame = function (req, res, next) {
  req.checkParams('gameid', 'Invalid Game ID').notEmpty().isAscii();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + JSON.stringify(result.array()));
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
  let allowedFields = ['id', 'gamenames', 'searchTermsEl', 'urls', 'timestamp'];

  let ret = _.pick(gameInfo, allowedFields);

  res.json(ret);
};

GameController.prototype.getGamesList = function (req, res) {
  let allowedFields = ['id', 'gamenames', 'searchTermsEl', 'urls', 'timestamp'];

  this.gameMgr.getGames().then(function (games) {
    let ret = _.map(games, (game) => {
      return _.pick(game, allowedFields);
    });

    res.json(ret);
  }.bind(this));
};

GameController.prototype.addGame = function (req, res) {
  req.checkBody('gamename', 'Invalid Gamename').notEmpty();
  req.checkBody('gamenameEn', 'Invalid English Gamename').optional().isAlphanumeric();
  req.checkBody('gamenameKr', 'Invalid Korean Gamename').optional().isAlphanumeric();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + JSON.stringify(result.array()));
    }

    let gamename = req.body.gamename;
    let gamenameEn = req.body.gamenameEn;
    let gamenameKr = req.body.gamenameKr;

    let gamenames = [
    {
      alias: 'base',
      name: gamename
    },
    {
      alias: 'en',
      name: gamenameEn
    },
    {
      alias: 'kr',
      name: gamenameKr
    }
  ];

    let created = new GameModel(null, gamenames, [], [], new Date(Date.now()));

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
  req.checkBody('gamename', 'Invalid Gamename').notEmpty().isAlphanumeric();
  req.checkBody('alias', 'Invalid Gamename Alias').notEmpty().isAlphanumeric();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + JSON.stringify(result.array()));
    }

    let gameInfo = req.info.game;
    let name = req.body.gamename;
    let nameAlias = req.body.alias;

    // update fields
    let nameEl = _.find(gameInfo.gamenames, (nameEl) => {
      return nameEl.alias === nameAlias;
    });

    if (true === _.isUndefined(nameEl)) {
      gameInfo.gamenames.push({
        alias: nameAlias,
        name: name
      });
    } else {
      _.set(nameEl, 'name', name);
    }

    this.gameMgr.upsertGame(gameInfo)
      .then((saved) => {
        return res.json(saved.gamenames);
      })
      .catch((err) => {
        return res.status(500).json({ msg: `Updating game failed ${err.message}` });
      });
  }.bind(this));
};

GameController.prototype.addGameSearchTerm = function (req, res) {
  req.checkBody('term', 'Invalid Term').notEmpty().isAlphanumeric();
  req.checkBody('type', 'Invalid Market Type for Search TermsEl').notEmpty().isAlphanumeric();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + JSON.stringify(result.array()));
    }

    let gameInfo = req.info.game;
    let term = req.body.term;
    let type = req.body.type;

    // update fields
    let termsEl = _.find(gameInfo.searchTerms, (term) => {
      return term.market === type;
    });

    if (true === _.isUndefined(termsEl)) {
      gameInfo.searchTerms.push({
        market: type,
        terms: [term]
      })
    } else {
      termsEl.terms.push(term);
    }

    this.gameMgr.upsertGame(gameInfo)
      .then((saved) => {
        return res.json(saved.searchTerms);
      })
      .catch((err) => {
        return res.status(500).json({ msg: `Updating game failed ${err.message}` });
      });
  }.bind(this));
};

GameController.prototype.addGameURL = function (req, res) {
  req.checkBody('url', 'Invalid URL').notEmpty().isURL();
  req.checkBody('type', 'Invalid Market Type').notEmpty().isAlphanumeric();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + JSON.stringify(result.array()));
    }

    let gameInfo = req.info.game;
    let url = req.body.url;
    let type = req.body.type;

    // update fields
    let urlEl = _.find(gameInfo.urls, (urlEl) => {
      return urlEl.market === type;
    });

    if (true === _.isUndefined(urlEl)) {
      gameInfo.urls.push({
        market: type,
        url: url
      })
    } else {
      _.set(urlEl, 'url', url);
    }

    this.gameMgr.upsertGame(gameInfo)
      .then((saved) => {
        return res.json(saved.urls);
      })
      .catch((err) => {
        return res.status(500).json({ msg: `Updating game failed ${err.message}` });
      });
  }.bind(this));
};

GameController.prototype.removeGameName = function (req, res) {
  req.checkParams('alias', 'Invalid Gamename Alias').notEmpty().isAlphanumeric();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + JSON.stringify(result.array()));
    }

    let gameInfo = req.info.game;
    let nameAlias = req.params.alias;

    // update fields
    let removed = _.remove(gameInfo.gamenames, (nameEl) => {
      return nameEl.alias === nameAlias;
    });

    this.gameMgr.upsertGame(gameInfo)
      .then((saved) => {
        return res.json(removed);
      })
      .catch((err) => {
        return res.status(500).json({ msg: `Updating game failed ${err.message}` });
      });
  }.bind(this));
};

GameController.prototype.removeGameSearchTerm = function (req, res) {
  req.checkParams('type', 'Invalid Market Type for Search TermsEl').notEmpty().isAlphanumeric();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + JSON.stringify(result.array()));
    }

    let gameInfo = req.info.game;
    let type = req.params.type;

    // update fields
    let removed = _.removed(gameInfo.searchTerms, (term) => {
      return term.market === type;
    });

    this.gameMgr.upsertGame(gameInfo)
      .then((saved) => {
        return res.json(removed);
      })
      .catch((err) => {
        return res.status(500).json({ msg: `Updating game failed ${err.message}` });
      });
  }.bind(this));
};

GameController.prototype.removeGameURL = function (req, res) {
  req.checkParams('type', 'Invalid Market Type').notEmpty().isAlphanumeric();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + JSON.stringify(result.array()));
    }

    let gameInfo = req.info.game;
    let type = req.params.type;

    // update fields
    let removed = _.remove(gameInfo.urls, (urlEl) => {
      return urlEl.market === type;
    });

    this.gameMgr.upsertGame(gameInfo)
      .then((saved) => {
        return res.json(removed);
      })
      .catch((err) => {
        return res.status(500).json({ msg: `Updating game failed ${err.message}` });
      });
  }.bind(this));
};

// GameController.prototype.addGamePriceRecord = function (req, res) {
//   // TODO::
//   throw new Error();
// };

module.exports = GameController;