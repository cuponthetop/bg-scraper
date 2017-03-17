let es = require('elasticsearch');

let UserManager = require('../managers/user');
let GameManager = require('../managers/game');
let PostManager = require('../managers/post');

let UserController = require('../controllers/user');
let GameController = require('../controllers/game');
let CrawlerController = require('../controllers/crawler');

module.exports = function (config) {
  let esHost = config.elasticsearch_address;

  let client = es.Client({
    host: esHost,
    log: 'trace'
  });

  // instantiate models, controllers
  let managers = {
    user: new UserManager(client),
    game: new GameManager(client),
    post: new PostManager(client),
  };

  let controllers = {
    user: new UserController(managers),
    game: new GameController(managers),
    crawler: new CrawlerController(managers),
  };

  return controllers;
};
