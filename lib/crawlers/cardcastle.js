var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function CardCastleCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
  this.currency.updateCurrency();
};

CardCastleCrawler.prototype = new ProtoCrawler();

CardCastleCrawler.prototype.getType = function () {
  return 'CardCastle';
};

CardCastleCrawler.prototype.search = function (searchTerm) {
  if (typeof searchTerm !== "string") {
    throw new Error(`searchTerm is not of type string ${JSON.stringify(searchTerm)}`);
  }
  let escapedTerm = searchTerm;
  return new Promise(function (resolve, reject) {
    crawl(`http://cardcastle.co.kr/product/search.html?banner_action=&keyword=${escapedTerm}`)
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

CardCastleCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then(function (data) {

        //span#span_product_price_text \ span#span_product_price_sale, grab html() and strip off <[^/>]*>.+<\/[^>]*> with empty string to remove percentage

        let $ = cheerio.load(data);
        // TODO:::
        let price = $('').text();
        let ret = {
          type: this.getType(),
          price,
          stock: null
        };
        resolve(ret);
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

CardCastleCrawler.prototype.canCrawl = function (jobtype) {
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

module.exports = CardCastleCrawler;