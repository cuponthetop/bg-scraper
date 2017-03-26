var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');
var rel2abs = require('../util/absolutify-url').bind(null, 'www.coolstuffinc.com');

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
    crawl(`http://www.coolstuffinc.com/main_search.php?pa=searchOnName&page=1&resultsPerPage=50&q=${escapedTerm}`)
      .then(function (data) {
        let $ = cheerio.load(data);

        let rows = $('table#searchResults').children('tbody').children('tr').map(function (i, el) {
          let cheerioEl = $(el);
          let img = cheerioEl.find('td.picture').find('img.tn').attr('src');
          let link = cheerioEl.find('td.description a.productLink');
          let url = rel2abs(link.attr('href'));
          let en = link.text();
          let priceEl = cheerioEl.find('td.products').find('table.userTable').find('td.pPrice').find('span b');
          let price = '';
          if (false === _.isUndefined(priceEl)) {
            price = priceEl.text();
          }

          return {
            img,
            url,
            en,
            price
          };
        });

        let ret = _.map(rows, function (el) {
          return el;
        });

        resolve(ret);
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
        let stockStr = $('p.stock').text();
        let stock = 0;
        if (stockStr.indexOf('Out of Stock') === -1) {
          stock = parseInt(stockStr);
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