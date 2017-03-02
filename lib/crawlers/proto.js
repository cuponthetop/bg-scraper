var Currency = require('./currency');

function ProtoCrawler() {
  this.currency = new Currency();
};

ProtoCrawler.prototype.getType = function () { return 'ProtoType'; };
ProtoCrawler.prototype.getPriceInWon = function (url) {
  return new Promise(function (resolve, reject) {
    this.getPrice(url)
      .then(function (price) {
        resolve({
          type: price.type,
          priceInWon: price.price * this.currency.getCurrency(),
          originalPrice: price.price,
          stock: price.stock
        });
      }.bind(this))
      .catch(reject);
  }.bind(this));
};
/**
 * { game[] }
 */
ProtoCrawler.prototype.getGamesPrice = function (args) {
  let games = args.games;

  return Promise.all(_.map(games, function (game) {
    let correctURLTuple = _.find(game.urls, function (marketURLTuple) {
      return marketURLTuple.market === this.getType();
    }.bind(this));

    if (_.isUndefined(correctURLTuple)) {
    } else {
      return new Promise(function (resolve, reject) {
        let priceTuple = this.getPriceInWon(correctURLTuple.url);
        resolve({
          game: game.id,
          fromWhichShop: this.getType(),
          price: priceTuple.originalPrice,
          priceInWon: priceTuple.priceInWon
        });
      }.bind(this));
    }
  }));
};
ProtoCrawler.prototype.search = function (searchTerm) { throw new Error(`Method search not implemented yet`) };
ProtoCrawler.prototype.getPrice = function (url) { throw new Error(`Method getPrice not implemented yet`) };
ProtoCrawler.prototype.crawlList = function () { throw new Error(`Method crawlList not implemented yet`) };
ProtoCrawler.prototype.crawlItem = function (itemID, title, linkURL) { throw new Error(`Method crawlItem not implemented yet`) };
ProtoCrawler.prototype.canCrawl = function (jobtype) { return false };

module.exports = ProtoCrawler;