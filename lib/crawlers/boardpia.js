var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function BoardPiaCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));

};

BoardPiaCrawler.prototype = new ProtoCrawler();

BoardPiaCrawler.prototype.getType = function () {
  return 'BoardPia';
};

BoardPiaCrawler.prototype.search = function (searchTerm) {
  if (typeof searchTerm !== "string") {
    throw new Error(`searchTerm is not of type string ${JSON.stringify(searchTerm)}`);
  }
  let escapedTerm = searchTerm;
  return new Promise(function (resolve, reject) {
    crawl(`http://boardpia.co.kr/mall/product_list.html?search=${escapedTerm}`)
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

BoardPiaCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then(function (data) {
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

BoardPiaCrawler.prototype.crawlList = function () {
  throw new Error('BoardPiaCrawler - crawlList - NotImplemented');
};

BoardPiaCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('BoardPiaCrawler - crawlItem - NotImplemented');
};

BoardPiaCrawler.prototype.canCrawl = function (jobtype) {
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

module.exports = BoardPiaCrawler;