var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function BoardPiaCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
  this.currency.updateCurrency();
}

BoardPiaCrawler.prototype = new ProtoCrawler()

BoardPiaCrawler.prototype.getType = function () {
  return 'BoardPia';
}
BoardPiaCrawler.prototype.search = function (search_term) {
  return new Promise(function (resolve, reject) {
    crawl('')
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};
BoardPiaCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

BoardPiaCrawler.prototype.crawlList = function () {
  throw new Error('BoardPiaCrawler - crawlList - NotImplemented');
};

BoardPiaCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('BoardPiaCrawler - crawlItem - NotImplemented');
};

module.exports = BoardPiaCrawler;