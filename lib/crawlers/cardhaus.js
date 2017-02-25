var crawl = require('../crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function CardhausCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
  this.currency.setCurrentCurrency('usd');
  this.currency.updateCurrency();
}

CardhausCrawler.prototype = new ProtoCrawler()

CardhausCrawler.prototype.getType = function () {
  return 'Cardhaus';
}
CardhausCrawler.prototype.search = function (search_term) {
  return new Promise((resolve, reject) => {
    crawl('')
      .then((data) => {

      })
      .catch(reject);
  });
};
CardhausCrawler.prototype.getPrice = function (url) {
  return new Promise((resolve, reject) => {
    crawl('')
      .then((data) => {

      })
      .catch(reject);
  });
};

CardhausCrawler.prototype.crawlList = function () {
  throw new Error('CardhausCrawler - crawlList - NotImplemented');
};

CardhausCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('CardhausCrawler - crawlItem - NotImplemented');
};

var test = new CardhausCrawler();
test.crawlList();
module.exports = CardhausCrawler;