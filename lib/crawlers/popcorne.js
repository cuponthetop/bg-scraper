var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function PopcornEduCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
  this.currency.updateCurrency();
};

PopcornEduCrawler.prototype = new ProtoCrawler();

PopcornEduCrawler.prototype.getType = function () {
  return 'PopcornEdu';
};

PopcornEduCrawler.prototype.search = function (search_term) {
  return new Promise(function (resolve, reject) {
    crawl('')
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

PopcornEduCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

PopcornEduCrawler.prototype.crawlList = function () {
  throw new Error('PopcornEduCrawler - crawlList - NotImplemented');
};

PopcornEduCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('PopcornEduCrawler - crawlItem - NotImplemented');
};

PopcornEduCrawler.prototype.canCrawl = function (jobtype) {
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

module.exports = PopcornEduCrawler;