var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function CoolStuffCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
  this.currency.setCurrentCurrency('usd');
  this.currency.updateCurrency();
}

CoolStuffCrawler.prototype = new ProtoCrawler()

CoolStuffCrawler.prototype.getType = function () {
  return 'CoolStuffInc';
}
CoolStuffCrawler.prototype.search = function (search_term) {
  return new Promise(function (resolve, reject) {
    crawl('')
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};
CoolStuffCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl('')
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

CoolStuffCrawler.prototype.crawlList = function () {
  throw new Error('CoolStuffCrawler - crawlList - NotImplemented');
};

CoolStuffCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('CoolStuffCrawler - crawlItem - NotImplemented');
};

module.exports = CoolStuffCrawler;