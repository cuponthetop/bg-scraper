let crawl = require('../util/crawl');
let _ = require('lodash');
let cheerio = require('cheerio');
let ProtoCrawler = require('./proto');
let path = require('path').posix;
let Cache = require('node-cache');
let b = require('bluebird');

function BoardLifeCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
  this.currency.updateCurrency();
  this.cache = new Cache({ stdTTL: 604800, checkperiod: 36000 });
}

BoardLifeCrawler.prototype = new ProtoCrawler()

BoardLifeCrawler.prototype.getType = function () {
  return 'BoardLife';
}
BoardLifeCrawler.prototype.search = function (search_term) {
  return new Promise(function (resolve, reject) {
    crawl('')
      .then((data) => {

      })
      .catch(reject);
  }.bind(this));
};
BoardLifeCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then((data) => {
        let $ = cheerio.load(data);

        let table = $('.default_layout table tbody tr td table tbody tr td div table tbody tr td form table tbody tr')
        // 휴 길다


      })
      .catch(reject);
  });
};
BoardLifeCrawler.prototype.crawlList = function () {
  return new Promise(function (resolve, reject) {
    crawl('http://boardlife.co.kr/bbs_list.php?tb=board_used')
      .then((data) => {
        let $ = cheerio.load(data);

        let table = $('tbody tr td table tbody tr td table tbody tr td table tbody tr');
        let children = table.filter((el) => {
          // filter where onmouseover attribute is set
        });

        let itemFunc = this.crawlItem;
        let cacheGet = b.promisify(this.cache.get, {
          context: this.cache
        });
        let promises = [];
        // for each tr
        children.each(function (i, elem) {
          // 2nd td / 1st td with align=center
          let itemID = $(this).find('td.num').text();
          // 6th td... sigh / 1st td with aligh=left
          let title = $(this).find('td a').text();
          // link url is relative, should resolve using posix path
          let linkURL = path.resolve('http://boardlife.co.kr/bbs_list.php?tb=board_used/', $(this).find('td a').attr('href'));
          promises.push(itemFunc(itemID, title, linkURL));
        });

        cacheGet(itemID).then((res) => {
          if (true === _.isUndefined(res)) {
            promises.push(itemFunc(itemID, title, linkURL));
          } else {
            // already checked
          }
        });
      })
      .catch(reject);
  }.bind(this));
};

BoardLifeCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  return new Promise(function (resolve, reject) {
    crawl(linkURL)
      .then((data) => {
        let $ = cheerio.load(data);

        let content = $('#board_contents').text();
        let ret = {
          itemID,
          title,
          linkURL,
          content
        };
        this.cache.set(itemID, ret);
        resolve(ret);
      })
      .catch(reject);
  }.bind(this));
};

module.exports = BoardLifeCrawler;