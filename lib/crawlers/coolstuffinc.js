var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function CoolStuffCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
};

CoolStuffCrawler.prototype = new ProtoCrawler();

CoolStuffCrawler.prototype.getType = function () {
  return 'CoolStuffInc';
};

CoolStuffCrawler.prototype.getCurrencyType = function () { return 'USD'; };

CoolStuffCrawler.prototype.search = function (searchTerm) {
  if (typeof searchTerm !== "string") {
    throw new Error(`searchTerm is not of type string ${JSON.stringify(searchTerm)}`);
  }
  let escapedTerm = searchTerm;
  return new Promise(function (resolve, reject) {
    crawl(`http://www.coolstuffinc.com/main_search.php?pa=searchOnName&page=1&resultsPerPage=25&q=${escapedTerm}`)
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

CoolStuffCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then(function (data) {
        let $ = cheerio.load(data);

        let price = $('td.vm.l.actualPrice').text();
        let stock = $('p.stock').text();
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

CoolStuffCrawler.prototype.crawlList = function () {
  throw new Error('CoolStuffCrawler - crawlList - NotImplemented');
};

CoolStuffCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('CoolStuffCrawler - crawlItem - NotImplemented');
};

CoolStuffCrawler.prototype.canCrawl = function (jobtype) {
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

module.exports = CoolStuffCrawler;