let GameModel = require('../models/game');
let _ = require('lodash');

function GameManager(esClient) {
  this.client = esClient;
};

GameManager.prototype.getGame = function (gameid) {
  return new Promise(function (resolve, reject) {
    this.client.get({
      index: 'esindex',
      type: 'game',
      id: gameid
    })
      .then((res) => {
        if (res.found) {
          resolve(new GameModel(res._id, res._source.gamenames, res._source.searchTerms, res._source.urls, res._source.timestamp));
        } else {
          resolve(null);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }.bind(this));
};

GameManager.prototype.upsertGame = function (game) {
  return new Promise(function (resolve, reject) {
    let opts = {
      index: 'esindex',
      type: 'game',
      body: {
        gamenames: game.gamenames,
        searchTerms: game.searchTerms,
        urls: game.urls,
        timestamp: game.timestamp
      }
    };

    if (_.isNull(game.id)) {
      // insert
    } else {
      // update
      opts.id = game.id;
    }

    this.client.index(opts)
      .then((res) => {
        game.id = res.id;
        resolve(game);
      })
      .catch((err) => {
        console.error(err);
      });
  }.bind(this));
};

GameManager.prototype.deleteGame = function (gameid) {
  return new Promise(function (resolve, reject) {
    this.client.delete({
      index: 'esindex',
      type: 'game',
      id: gameid
    })
      .then((res) => {
        resolve(gameid);
      })
      .catch((err) => {
        console.error(err);
      });
  }.bind(this));
};


GameManager.prototype.getGames = function () {
  return new Promise(function (resolve, reject) {
    this.client.search({
      index: 'esindex',
      type: 'game',
      body: {
        query: {
          match_all: {}
        }
      },
      size: 10000,
    })
      .then((res) => {
        let ret = _.map(res.hits.hits, (hit) => {
          return new GameModel(hit._id, hit._source.gamenames, hit._source.searchTerms, hit._source.urls, hit._source.timestamp);
        });

        resolve(ret);
      })
      .catch((err) => {
        console.error(err);
      });
  }.bind(this));
};

GameManager.prototype.addPrice = function (price) {
  return new Promise(function (resolve, reject) {

    let opts = {
      index: 'esindex',
      type: 'price',
      body: {
        game: price.game,
        fromWhichShop: price.fromWhichShop,
        price: price.price,
        priceInWon: price.priceInWon,
        timestamp: new Date(Date.now())
      }
    };

    this.client.index(opts)
      .then((res) => {
        resolve(price);
      })
      .catch((err) => {
        console.error(err);
      });

  }.bind(this));
};

module.exports = GameManager;