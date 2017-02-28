var crawl = require('../util/crawl');
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
  return new Promise(function (resolve, reject) {
    crawl('')
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};
CardhausCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl('')
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

CardhausCrawler.prototype.crawlList = function () {
  throw new Error('CardhausCrawler - crawlList - NotImplemented');
};

CardhausCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('CardhausCrawler - crawlItem - NotImplemented');
};

module.exports = CardhausCrawler;