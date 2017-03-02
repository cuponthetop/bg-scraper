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
};

DDCrawler.prototype = new ProtoCrawler();;

DDCrawler.prototype.getType = function () {
  return 'DiveDice';
};

DDCrawler.prototype.search = function (searchTerm) {
  if (typeof searchTerm !== "string") {
    throw new Error(`searchTerm is not of type string ${JSON.stringify(searchTerm)}`);
  }
  let escapedTerm = searchTerm;
  return new Promise(function (resolve, reject) {
    crawl(`http://www.divedice.com/web_dev/game/gds_list_search.php#top_name=${escapedTerm}&pagenum=&product_page=8&sel_type=1`)
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

DDCrawler.prototype.getPrice = function (url) {
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

DDCrawler.prototype.crawlList = function () {
  return new Promise(function (resolve, reject) {
    crawl('http://www.divedice.com/web_dev/bbs/bbs_list_type01.php?type=f&c_type=1&pagenum=1&cateid=A002A021A006')
      .then(function (data) {
        let $ = cheerio.load(data);

        let table = $('.bbs_list.bbs_list01 table tbody');
        let children = table.children();

        let itemFunc = this.crawlItem.bind(this);
        let cacheGet = this.cache.get.bind(this.cache);

        let promises = [];
        // for each tr
        children.each(function (i, elem) {
          let itemID = $(this).find('td.num').text();
          let title = $(this).find('td p a span').text();
          let linkURL = 'http://www.divedice.com/web_dev/bbs/' + $(this).find('td p a').attr('href');
          let alreadyChecked = false;

            if (true === _.isUndefined(cacheGet(itemID))) {
              promises.push(itemFunc(itemID, title, linkURL));
            } else {
              // already checked
            }
        });

        Promise.all(promises).then(resolve).catch(reject);
      }.bind(this))
      .catch(reject);
  }.bind(this));
};

DDCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  return new Promise(function (resolve, reject) {
    crawl(linkURL)
      .then(function (data) {
        let $ = cheerio.load(data);

        let content = $('.cont_txt').text();
        let ret = {
          type: this.getType(),
          itemID,
          title,
          linkURL,
          content
        };
        this.cache.set(itemID, ret);
        resolve(ret);
      }.bind(this))
      .catch(reject);
  }.bind(this));
};

DDCrawler.prototype.canCrawl = function (jobtype) {
  switch(jobtype) {
    case 'price': {
      return true;
    }
    case 'post': {
      return true;
    }
    default: {
      return false;
    }
  }
};

module.exports = DDCrawler;