let crawl = require('../util/crawl');
let _ = require('lodash');
let cheerio = require('cheerio');
let ProtoCrawler = require('./proto');
let Cache = require('node-cache');
let b = require('bluebird');

function DDCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
  this.currency.updateCurrency();
  this.cache = new Cache({ stdTTL: 604800, checkperiod: 36000 });
}

DDCrawler.prototype = new ProtoCrawler();

DDCrawler.prototype.getType = function () {
  return 'DiveDice';
}
DDCrawler.prototype.search = function (search_term) {
  return new Promise((resolve, reject) => {
    crawl('')
      .then((data) => {

      })
      .catch(reject);
  });
};
DDCrawler.prototype.getPrice = function (url) {
  return new Promise((resolve, reject) => {
    crawl('')
      .then((data) => {

      })
      .catch(reject);
  });
};
DDCrawler.prototype.crawlList = function () {
  return new Promise((resolve, reject) => {
    crawl('http://www.divedice.com/web_dev/bbs/bbs_list_type01.php?type=f&c_type=1&pagenum=1&cateid=A002A021A006')
      .then((data) => {
        let $ = cheerio.load(data);

        let table = $('.bbs_list.bbs_list01 table tbody');
        let children = table.children();

        let itemFunc = this.crawlItem;
        let cacheGet = b.promisify(this.cache.get, {
          context: this.cache
        });
        let promises = [];
        // for each tr
        children.each(function (i, elem) {
          let itemID = $(this).find('td.num').text();
          let title = $(this).find('td p a span').text();
          let linkURL = 'http://www.divedice.com/web_dev/bbs/' + $(this).find('td p a').attr('href');
          let alreadyChecked = false;

          cacheGet(itemID).then((res) => {
            if (true === _.isUndefined(res)) {
              promises.push(itemFunc(itemID, title, linkURL));
            } else {
              // already checked
            }
          });
        });

        Promise.all(promises).then(resolve).catch(reject);
      })
      .catch(reject);
  });
};

DDCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  return new Promise((resolve, reject) => {
    crawl(linkURL)
      .then((data) => {
        let $ = cheerio.load(data);

        let content = $('.cont_txt').text();
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
  });
};

module.exports = DDCrawler;