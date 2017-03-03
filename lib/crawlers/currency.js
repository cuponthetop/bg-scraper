var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');

function CurrencyCrawler() {
  this.currency = {};
};

CurrencyCrawler.prototype.getCurrency = function (desired) {
  switch (desired) {
    case 'WON': {
      return this.currency['WON'];
      break;
    }
    case 'USD': {
      return this.currency['USD'];
      break;
    }
    default: {
      throw new Error(`unacceptable currency ${desired}`);
    }
  }
};

CurrencyCrawler.prototype.crawlCurrency = function () {
  let listCurrency = ['WON', 'USD'];
  return Promise.all(_.map(listCurrency, function(currency) {
    return new Promise(function(resolve, reject){
      let func = _.get(this, 'crawl' + currency, undefined);

      if (_.isUndefined(func)) {
        throw new Error(`unexpected currency type ${currency}`);
      }
      func.call(this).then(function (crawledValue){
        _.set(this.currency, currency, crawledValue);
        resolve();
      }.bind(this));
    }.bind(this));
  }.bind(this)));
};

CurrencyCrawler.prototype.crawlWON = function () {
  return new Promise((resolve, reject) => { resolve(1); });
};

CurrencyCrawler.prototype.crawlUSD = function () {
  return new Promise((resolve, reject) => {
    crawl('http://info.finance.naver.com/marketindex/exchangeDetail.nhn?marketindexCd=FX_USDKRW')
      .then(function (data) {
        var $ = cheerio.load(data);
        let currency = $('th.th_ex4').siblings().text().replace(/[^0-9\.]*/g, '');
        resolve(parseFloat(currency));
      }.bind(this))
      .catch(reject);
  });
};

module.exports = CurrencyCrawler;