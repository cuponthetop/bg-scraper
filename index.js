let route = require('./lib/routes/route');

let express = require('express');
let bodyParser = require('body-parser');
let validator = require('express-validator');
let methodOverride = require('method-override');
let es = require('elasticsearch');

let UserManager = require('./lib/managers/user');
let GameManager = require('./lib/managers/game');
let PostManager = require('./lib/managers/post');
let UserController = require('./lib/controllers/user');
let GameController = require('./lib/controllers/game');
let CrawlerController = require('./lib/controllers/crawler');

let esHost = '';

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
}

let validatorOpts = {
  customValidators: {
    isArray: function (value) {
      return Array.isArray(value);
    },
    gte: function (param, num) {
      return param >= num;
    }
  }
};

let app = express();

app.use(methodOverride('X-HTTP-Method-Override'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(validator(validatorOpts));

route(app, controllers);

app.listen(3000);
