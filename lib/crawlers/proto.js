var Currency = require('./currency');

function ProtoCrawler() {
  this.currency = new Currency();
};

ProtoCrawler.prototype.getType = function () { return 'ProtoType'; };
ProtoCrawler.prototype.getPriceInWon = function (url) {
  return new Promise((resolve, reject) => {
    this.getPrice(url)
      .then((price) => {
        resolve({ priceInWon: price * this.currency.getCurrency(), originalPrice: price });
      })
      .catch(reject);
  });
};
ProtoCrawler.prototype.search = function (search_term) { throw new Error(`Method search not implemented yet`) };
ProtoCrawler.prototype.getPrice = function (url) { throw new Error(`Method getPrice not implemented yet`) };
ProtoCrawler.prototype.crawlList = function () { throw new Error(`Method crawlList not implemented yet`) };
ProtoCrawler.prototype.crawlItem = function (itemID, title, linkURL) { throw new Error(`Method crawlItem not implemented yet`) };

module.exports = ProtoCrawler;