var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function CardhausCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
};

CardhausCrawler.prototype = new ProtoCrawler();

CardhausCrawler.prototype.getType = function () {
  return 'Cardhaus';
};

CardhausCrawler.prototype.getCurrencyType = function () { return 'USD'; };

CardhausCrawler.prototype.search = function (searchTerm) {
  if (typeof searchTerm !== "string") {
    throw new Error(`searchTerm is not of type string ${JSON.stringify(searchTerm)}`);
  }
  let escapedTerm = searchTerm;
  return new Promise(function (resolve, reject) {
    crawl(`http://www.cardhaus.com/products/search?query=${escapedTerm}&x=0&y=0`)
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

CardhausCrawler.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then(function (data) {
        let $ = cheerio.load(data);
        let price = '0';
        let stock = 0;
        let isOutOfStock = $('#sell-product-container h2 strong').text();

        if (_.isEmpty(isOutOfStock)) {
          let priceStockTable = $('#sell-product-container table tr');
          let newProductRow = priceStockTable.filter(function (i, el) {
            return ($(el).text().indexOf('New') !== -1);
          });
          price = newProductRow.find('span.price').not('span.msrp').text();
          stock = parseInt(newProductRow.find('span.qty').text());
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

CardhausCrawler.prototype.crawlList = function () {
  throw new Error('CardhausCrawler - crawlList - NotImplemented');
};

CardhausCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('CardhausCrawler - crawlItem - NotImplemented');
};

module.exports = CardhausCrawler;