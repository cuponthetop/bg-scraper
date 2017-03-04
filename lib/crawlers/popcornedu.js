var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function PopcornEduCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));

};

PopcornEduCrawler.prototype = new ProtoCrawler();

PopcornEduCrawler.prototype.getType = function () {
  return 'PopcornEdu';
};

PopcornEduCrawler.prototype.search = function (searchTerm) {
  if (typeof searchTerm !== "string") {
    throw new Error(`searchTerm is not of type string ${JSON.stringify(searchTerm)}`);
  }
  let escapedTerm = searchTerm;
  return new Promise(function (resolve, reject) {
    crawl(`http://www.popcone.co.kr/shop/goods/goods_search.php?searched=Y&log=1&skey=all&hid_pr_text=&hid_link_url=&edit=&sword=${escapedTerm}&x=0&y=0`)
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

PopcornEduCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then(function (data) {
        let $ = cheerio.load(data);

        let price = $('span.d_price').text();
        let stock = true;
        let stockRowStr = $('#goods_spec table tr').filter(function(i, el) {
          let cheerioEl = $(el);
          return (cheerioEl.find('th').text().indexOf('구매수량') !== -1) && (cheerioEl.find('td').text().indexOf('품절') !== -1);
        }).text();
        if (!_.isEmpty(stockRowStr)) {
          stock = false;
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

PopcornEduCrawler.prototype.crawlList = function () {
  throw new Error('PopcornEduCrawler - crawlList - NotImplemented');
};

PopcornEduCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('PopcornEduCrawler - crawlItem - NotImplemented');
};

PopcornEduCrawler.prototype.canCrawl = function (jobtype) {
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

module.exports = PopcornEduCrawler;