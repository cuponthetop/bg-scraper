let route = require('./lib/routes/route');

let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let validator = require('express-validator');
let methodOverride = require('method-override');
let morgan = require('morgan');

let crawlerValidator = require('./lib/validator/crawler');

let validatorOpts = {
  customValidators: {
    isArray: function (value) {
      return Array.isArray(value);
    },
    gte: function (param, num) {
      return param >= num;
    },
    isCrawler: crawlerValidator
  }
};

let config = require('./lib/util/read-config');
let createController = require('./lib/util/create-controllers');

let app = express();

app.use(cors(config.cors));

app.use(morgan('combined'));
app.use(methodOverride('X-HTTP-Method-Override'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(validator(validatorOpts));

let controllers = createController(config.controller);
route(app, controllers);

app.listen(3003);
