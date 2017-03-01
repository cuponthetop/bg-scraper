var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function BoardM() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
  this.currency.updateCurrency();
}

BoardM.prototype = new ProtoCrawler()

BoardM.prototype.getType = function () {
  return 'BoardM';
}
BoardM.prototype.search = function (search_term) {
  return new Promise(function (resolve, reject) {
    crawl('')
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};
BoardM.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

BoardM.prototype.crawlList = function () {
  throw new Error('BoardM - crawlList - NotImplemented');
};

BoardM.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('BoardM - crawlItem - NotImplemented');
};

module.exports = BoardM;