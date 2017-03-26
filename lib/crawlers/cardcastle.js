var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function CardCastleCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
};

CardCastleCrawler.prototype = new ProtoCrawler();

CardCastleCrawler.prototype.getType = function () {
  return 'CardCastle';
};

CardCastleCrawler.prototype.search = function (searchTerm) {
  if (typeof searchTerm !== "string") {
    throw new Error(`searchTerm is not of type string ${JSON.stringify(searchTerm)}`);
  }
  let escapedTerm = searchTerm;
  return new Promise(function (resolve, reject) {
    crawl(`http://cardcastle.co.kr/product/search.html?banner_action=&keyword=${escapedTerm}`)
      .then(function (data) {
        let $ = cheerio.load(data);

        let boxes = $('#contents ul li.item .box');

        let items = boxes.map(function (i, el) {
          let cheerioel = $(el);
          let url = cheerioel.children('a').attr('href');
          if (url[0] === '/') {
            url = 'http://cardcastle.co.kr' + url;
          };
          let img = cheerioel.find('img').attr('src');
          if (img[0] === '/' && img[1] === '/') {
            img = 'http:' + img;
          }
          let nameStr = cheerioel.find('p.name').children('a').children('span').text();
          let price = cheerioel.find('strong.grid').text();
          let kr = nameStr;
          let en = '';

          return {
            img,
            url,
            en,
            kr,
            price
          };
        });

        let ret = _.map(items, function (el) {
          return el;
        });

        resolve(ret);
      }.bind(this))
      .catch(reject);
  }.bind(this));
};

CardCastleCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then(function (data) {
        let $ = cheerio.load(data);
        let priceText = $('span#span_product_price_sale')
          .contents()
          .filter(function (i, el) {
            return el.type === "text" && (el.data.search(/[0-9]/) !== -1);
          })
          .text();

        if (_.isEmpty(priceText)) {
          priceText = $('strong#span_product_price_text').text();
        }

        let stockVarStr = data.match(/var option_stock_data = '([^;]*)';/);
        let stockNum = 0;
        if (_.isNull(stockVarStr)) {
          // probably in stock grab stock number
          let stockStr = $('tr.xans-record-').filter(function (i, el) {
            return $(el).find('th').text().indexOf('재고') !== -1;
          })
            .find('td span').text();
          stockNum = parseInt(stockStr.replace(/[^0-9]*/g, ''));
        } else {
          // if stock value was found and stock opt with price 0 is na,
          try {
            let stockVar = JSON.parse(stockVarStr[1].replace(/\\"/g, '"'));
            let newConditionKey = _.findKey(stockVar, function (value) {
              return value['stock_price'] === "0.00";
            });
            if (false === _.isUndefined(newConditionKey)) {
              stockNum = stockVar[newConditionKey]['stock_number'];
            }

          } catch (err) {
            // TODO::
            console.log(err.message);
          }
        }

        // if (0 === stockNum) {
        //   priceText = '0';
        // }

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

CardCastleCrawler.prototype.crawlList = function () {
  throw new Error('CardCastleCrawler - crawlList - NotImplemented');
};

CardCastleCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('CardCastleCrawler - crawlItem - NotImplemented');
};

CardCastleCrawler.prototype.canCrawl = function (jobtype) {
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

module.exports = CardCastleCrawler;