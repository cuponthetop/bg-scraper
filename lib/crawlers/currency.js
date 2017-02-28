var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');

function CurrencyCrawler() {
  this.currentCurrency = this.getWon;
  this.currency = null;
};

CurrencyCrawler.prototype.setCurrentCurrency = function (desired) {
  switch (desired) {
    case 'won': {
      this.currentCurrency = this.getWon;
      break;
    }
    case 'usd': {
      this.currentCurrency = this.getUSD;
      break;
    }
    default: {
      throw new Error(`unacceptable currency ${desired}`);
    }
  }
};

CurrencyCrawler.prototype.getCurrency = function () {
  return this.currency;
}

CurrencyCrawler.prototype.updateCurrency = function () {
  this.currentCurrency().then(function (currency) {
    this.currency = currency;
  }.bind(this)).catch((err) => {
    throw new Error(`Error occured while updating currency ${err} `);
  });
}

CurrencyCrawler.prototype.getWon = function () {
  return new Promise((resolve, reject) => { resolve(1); });
}

CurrencyCrawler.prototype.getUSD = function () {
  return new Promise((resolve, reject) => {
    crawl('http://info.finance.naver.com/marketindex/exchangeDetail.nhn?marketindexCd=FX_USDKRW')
      .then(function (data) {
        var $ = cheerio.load(data);
        // TODO::
      }.bind(this))
      .catch(reject);
  });
};

module.exports = CurrencyCrawler;