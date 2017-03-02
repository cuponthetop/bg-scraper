var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function MiniatureMarketCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
  this.currency.setCurrentCurrency('usd');
  this.currency.updateCurrency();
};

MiniatureMarketCrawler.prototype = new ProtoCrawler();

MiniatureMarketCrawler.prototype.getType = function () {
  return 'MiniatureMarket';
};

MiniatureMarketCrawler.prototype.search = function (searchTerm) {
  return new Promise(function (resolve, reject) {
    crawl(`http://www.miniaturemarket.com/searchresults?q=${searchTerm}`)
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

MiniatureMarketCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then(function (data) {
        let $ = cheerio.load(data);

        let price = $('p.special-price span.price').text();
        let stock = $('.availability').text();
        let ret = {
          type: this.getType(),
          price,
          stock
        };
        resolve(ret);
      }.bind(this))
      .catch(reject);
  }.bind(this));
};

MiniatureMarketCrawler.prototype.crawlList = function () {
  throw new Error('MiniatureMarketCrawler - crawlList - NotImplemented');
};

MiniatureMarketCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('MiniatureMarketCrawler - crawlItem - NotImplemented');
};

MiniatureMarketCrawler.prototype.canCrawl = function (jobtype) {
  switch(jobtype) {
    case 'price': {
      return true;
    }
    case 'post': {
      return false;
    }
    default: {
      return false;
    }
  }
};

module.exports = MiniatureMarketCrawler;