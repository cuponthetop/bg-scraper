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
    }
    case 'usd': {
      this.currentCurrency = this.getUSD;
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
  this.currentCurrency().then((currency) => {
    this.currency = currency;
  }).catch((err) => {
    throw new Error(`Error occured while updating currency ${err} `);
  });
}

CurrencyCrawler.prototype.getWon = function () {
  return new Promise((resolve, reject) => { resolve(1); });
}

CurrencyCrawler.prototype.getUSD = function () {
  return new Promise((resolve, reject) => {
    crawl('http://info.finance.naver.com/marketindex/exchangeDetail.nhn?marketindexCd=FX_USDKRW')
      .then((data) => {
        var $ = cheerio.load(data);
        // TODO::
      })
      .catch(reject);
  });
};

module.exports = CurrencyCrawler;