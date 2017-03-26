var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');
var rel2abs = require('../util/absolutify-url').bind(null, 'www.miniaturemarket.com');

function MiniatureMarketCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
};

MiniatureMarketCrawler.prototype = new ProtoCrawler();

MiniatureMarketCrawler.prototype.getType = function () {
  return 'MiniatureMarket';
};

MiniatureMarketCrawler.prototype.getCurrencyType = function () { return 'USD'; };

MiniatureMarketCrawler.prototype.search = function (searchTerm) {
  return new Promise(function (resolve, reject) {
    crawl(`http://api.searchspring.net/api/search/search.json?method=search&q=${searchTerm}&format=json&websiteKey=6f9c319d45519a85863e68be9c3f5d81`)
      .then(function (data) {
        let jsoned = JSON.parse(data);

        let $ = cheerio.load(jsoned.results);

        let rows = $('.item').map(function (i, el) {
          let cheerioEl = $(el);

          let img = rel2abs(cheerioEl.find('a.product-image').children('img').attr('src'));
          let link = cheerioEl.find('h3.product-name a');
          let url = rel2abs(link.attr('href'));
          let en = link.text();
          let priceEl = cheerioEl.find('.price-box p.special-price span.price');
          let price = priceEl.text();

          return {
            img,
            url,
            en,
            price
          };
        });

        let ret = _.map(rows, function (el) {
          return el;
        });

        resolve(ret);
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
        let stockStr = $('.availability').text();
        let stock = 0;
        if (stockStr.indexOf('Out of stock') === -1) {
          stock = parseInt(stockStr);
        }

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
  switch (jobtype) {
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