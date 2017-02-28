var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function AmazonCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
  this.currency.setCurrentCurrency('usd');
  this.currency.updateCurrency();
}

AmazonCrawler.prototype = new ProtoCrawler()

AmazonCrawler.prototype.getType = function () {
  return 'Amazon';
}
AmazonCrawler.prototype.search = function (search_term) {
  return new Promise(function (resolve, reject) {
    crawl('')
      .then((data) => {

      })
      .catch(reject);
  });
};
AmazonCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl('')
      .then((data) => {

      })
      .catch(reject);
  });
};

AmazonCrawler.prototype.crawlList = function () {
  throw new Error('AmazonCrawler - crawlList - NotImplemented');
};

AmazonCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('AmazonCrawler - crawlItem - NotImplemented');
};

module.exports = AmazonCrawler;