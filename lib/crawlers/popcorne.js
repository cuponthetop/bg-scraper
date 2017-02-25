var crawl = require('../crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function PopcornEduCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
}

PopcornEduCrawler.prototype = new ProtoCrawler()

PopcornEduCrawler.prototype.getType = function () {
  return 'PopcornEdu';
}
PopcornEduCrawler.prototype.search = function (search_term) {
  return new Promise((resolve, reject) => {
    crawl('')
      .then((data) => {

      })
      .catch(reject);
  });
};
PopcornEduCrawler.prototype.getPrice = function (url) {
  return new Promise((resolve, reject) => {
    crawl('')
      .then((data) => {

      })
      .catch(reject);
  });
};

PopcornEduCrawler.prototype.crawlList = function () {
  throw new Error('PopcornEduCrawler - crawlList - NotImplemented');
};

PopcornEduCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('PopcornEduCrawler - crawlItem - NotImplemented');
};

var test = new PopcornEduCrawler();
test.crawlList();
module.exports = PopcornEduCrawler;