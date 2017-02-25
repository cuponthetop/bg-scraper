var express = require('express');


module.exports = function () {
  var price = express();

  price.post('/price', function (req, res) {

  });
  price.delete('/price', function (req, res) {

  });
  price.get('/price/:priceid', function (req, res) {

  });
  return price;
};