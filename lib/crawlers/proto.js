let _ = require('lodash');

function ProtoCrawler() {
};

ProtoCrawler.prototype.getType = function () { return 'ProtoType'; };
// Implement this function to change currency type used for calculating priceInWon
ProtoCrawler.prototype.getCurrencyType = function () { return 'WON'; };
// Do not change this if possible
ProtoCrawler.prototype.getPriceInWon = function (url, currency) {
  return new Promise(function (resolve, reject) {
    this.getPrice(url)
      .then(function (price) {
        resolve({
          type: price.type,
          priceInWon: `${parseFloat(price.price.replace(/[^0-9\.]*/g, '')) * currency}`,
          originalPrice: price.price.replace(/[^0-9\.]*/g, ''),
          stock: price.stock
        });
      }.bind(this))
      .catch(reject);
  }.bind(this));
};
/**
 * { game[] }
 * function used to crawl prices of list of games provided
 * Do not change if possible
 */
ProtoCrawler.prototype.getGamesPrice = function (args) {
  let manager = args.gameManager;
  let currencyCrawler = args.currencyCrawler;

  return manager.getGames().then((gamesGot) => {
    let games = gamesGot;

    return Promise.all(_.map(games, function (game) {
      let correctURLTuple = _.find(game.urls, function (marketURLTuple) {
        return marketURLTuple.market === this.getType();
      }.bind(this));

      if (_.isUndefined(correctURLTuple)) {
        return null;
      } else {
        return new Promise(function (resolve, reject) {
          let currencyType = this.getCurrencyType();
          let currency = currencyCrawler.getCurrency(currencyType);
          let shopType = this.getType();
          this.getPriceInWon(correctURLTuple.url, currency).then(function (priceTuple) {
            resolve({
              game: game.id,
              fromWhichShop: shopType,
              price: priceTuple.originalPrice,
              priceInWon: priceTuple.priceInWon
            });
          }.bind(this));
        }.bind(this));
      }
    }.bind(this)).filter(function (el) {
      return !_.isNull(el);
    }));
  });
};
// Implement this fuction to produce list of search results from given search term
ProtoCrawler.prototype.search = function (searchTerm) { throw new Error(`Method search not implemented yet`) };
// Implement this fuction to extract price of game and stock from given url
ProtoCrawler.prototype.getPrice = function (url) { throw new Error(`Method getPrice not implemented yet`) };
// Implement this fuction to crawl list of items (used items postings)
ProtoCrawler.prototype.crawlList = function () { throw new Error(`Method crawlList not implemented yet`) };
// Implement this fuction to crawl information of each item in list generated from crawlList();
ProtoCrawler.prototype.crawlItem = function (itemID, title, linkURL) { throw new Error(`Method crawlItem not implemented yet`) };
// Implement this fuction to return true for each crawl job type implemented and ready to use
ProtoCrawler.prototype.canCrawl = function (jobtype) { return false };

module.exports = ProtoCrawler;