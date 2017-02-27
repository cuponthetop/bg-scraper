var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function MiniatureMarketCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
  this.currency.setCurrentCurrency('usd');
  this.currency.updateCurrency();
}

MiniatureMarketCrawler.prototype = new ProtoCrawler()

MiniatureMarketCrawler.prototype.getType = function () {
  return 'MiniatureMarket';
}
MiniatureMarketCrawler.prototype.search = function (search_term) {
  return new Promise((resolve, reject) => {
    crawl('')
      .then((data) => {

      })
      .catch(reject);
  });
};
MiniatureMarketCrawler.prototype.getPrice = function (url) {
  return new Promise((resolve, reject) => {
    crawl('')
      .then((data) => {

      })
      .catch(reject);
  });
};

MiniatureMarketCrawler.prototype.crawlList = function () {
  throw new Error('MiniatureMarketCrawler - crawlList - NotImplemented');
};

MiniatureMarketCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('MiniatureMarketCrawler - crawlItem - NotImplemented');
};

module.exports = MiniatureMarketCrawler;