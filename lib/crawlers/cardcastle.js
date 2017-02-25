var crawl = require('../crawl');
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
  return new Promise((resolve, reject) => {
    crawl('')
      .then((data) => {

      })
      .catch(reject);
  });
};
CardCastleCrawler.prototype.getPrice = function (url) {
  return new Promise((resolve, reject) => {
    crawl('')
      .then((data) => {

      })
      .catch(reject);
  });
};

CardCastleCrawler.prototype.crawlList = function () {
  throw new Error('CardCastleCrawler - crawlList - NotImplemented');
};

CardCastleCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('CardCastleCrawler - crawlItem - NotImplemented');
};

var test = new CardCastleCrawler();
test.crawlList();
module.exports = CardCastleCrawler;