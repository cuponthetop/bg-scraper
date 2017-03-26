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
        let $ = cheerio.load(data);

        let searchList = $($('td.main_text table').get(1)).children('tr');

        let listlist = _.map(searchList, function (el) {
          let list = $(el).children('td');

          let ret = _.map(list, function (el2) {
            let img = $(el2).find('img').attr('src');
            let url = $(el2).find('font.mall_product').parent().attr('href');
            let en = $(el2).find('font.mall_product')
              .filter(function (i3, el3) {
                return $(el3).find('b').length === 0;
              }).text();
            let kr = $(el2).find('font.mall_product').has('b').contents()
              .filter(function (i3, el3) {
                return el3.type === "text";
              }).text();
            let price = $(el2).find('font.mall_product b').text();

            return {
              img,
              url,
              en,
              kr,
              price
            };
          });

          return ret;
        });

        let list = _.filter(_.flatten(listlist), function (el) {
          return typeof el.img !== "undefined";
        });

        resolve(list);
      }.bind(this))
      .catch(reject);
  }.bind(this));
};

BoardPiaCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then(function (data) {
        let $ = cheerio.load(data);

        let priceText = $('table table table table table table table tr')
          .filter(function (i, el) {
            let str = $(el).text();
            return str.search('판매가격') !== -1;
          }).find('font b').text();
        let comments = $('table table table table table table table')
          .contents()
          .filter(function (i, el) {
            return el.type === "comment" && (el.data.search('남은수량') !== -1);
          });
        let stock = comments.get(0).data.match(/([0-9]*) 개/);
        let stockNum = parseInt(stock);

        if (stockNum === 0) {
          priceText = '0';
        }

        let ret = {
          type: this.getType(),
          price: priceText,
          stock: stockNum
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

module.exports = BoardPiaCrawler;