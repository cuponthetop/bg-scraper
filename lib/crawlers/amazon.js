var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function AmazonCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
};

AmazonCrawler.prototype = new ProtoCrawler();

AmazonCrawler.prototype.getType = function () {
  return 'Amazon';
};

AmazonCrawler.prototype.getCurrencyType = function () { return 'USD'; };

AmazonCrawler.prototype.search = function (searchTerm) {
  if (typeof searchTerm !== "string") {
    throw new Error(`searchTerm is not of type string ${JSON.stringify(searchTerm)}`);
  }
  let escapedTerm = searchTerm;
  return new Promise(function (resolve, reject) {
    crawl(`${escapedTerm}`)
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

AmazonCrawler.prototype.getPrice = function (url) {
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

AmazonCrawler.prototype.crawlList = function () {
  throw new Error('AmazonCrawler - crawlList - NotImplemented');
};

AmazonCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('AmazonCrawler - crawlItem - NotImplemented');
};

AmazonCrawler.prototype.canCrawl = function (jobtype) {
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

module.exports = AmazonCrawler;