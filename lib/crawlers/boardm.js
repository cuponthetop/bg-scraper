var crawl = require('../util/crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function BoardM() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
  this.currency.updateCurrency();
};

BoardM.prototype = new ProtoCrawler();

BoardM.prototype.getType = function () {
  return 'BoardM';
};

BoardM.prototype.search = function (searchTerm) {
  if (typeof searchTerm !== "string") {
    throw new Error(`searchTerm is not of type string ${JSON.stringify(searchTerm)}`);
  }
  let escapedTerm = searchTerm;
  return new Promise(function (resolve, reject) {
    crawl(`http://www.boardm.co.kr/shop/goods/goods_search.php?searched=Y&log=1&skey=all&hid_pr_text=%B0%A3%B4%DC%C7%CF%B0%D4+%C1%F1%B1%E2%B4%C2+%C6%C4%C6%BC+%B0%D4%C0%D3+%27%B8%C7%B4%FD%C0%C7+%B4%F8%C0%FC%27%21&hid_link_url=http%3A%2F%2Fwww.boardm.co.kr%2Fshop%2Fgoods%2Fgoods_view.php%3Fgoodsno%3D3681&edit=Y&sword=${escapedTerm}&x=0&y=0`)
      .then(function (data) {

      }.bind(this))
      .catch(reject);
  }.bind(this));
};

BoardM.prototype.getPrice = function (url) {
  return new Promise(function (resolve, reject) {
    crawl(url)
      .then(function (data) {
        let $ = cheerio.load(data);

        let price = $('span#price').text();
        let stock = $('#goods_spec form table tbody tr td b').text();
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

BoardM.prototype.crawlList = function () {
  throw new Error('BoardM - crawlList - NotImplemented');
};

BoardM.prototype.crawlItem = function (itemID, title, linkURL) {
  throw new Error('BoardM - crawlItem - NotImplemented');
};

BoardM.prototype.canCrawl = function (jobtype) {
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

module.exports = BoardM;