var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function CardCastleCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
  this.currency.updateCurrency();
}

CardCastleCrawler.prototype = new ProtoCrawler()

CardCastleCrawler.prototype.getType = function () {
  return 'CardCastle';
}
CardCastleCrawler.prototype.search = function (search_term) {
  return new Promise(function (resolve, reject) {
    crawl('')
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};
CardCastleCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

CardCastleCrawler.prototype.crawlList = function () {
  throw new Error('CardCastleCrawler - crawlList - NotImplemented');
};

CardCastleCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('CardCastleCrawler - crawlItem - NotImplemented');
};

module.exports = CardCastleCrawler;