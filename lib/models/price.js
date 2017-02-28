function PriceModel(game, fromWhichShop, price, priceInWon, timestamp) {
  this.game = game;
  this.fromWhichShop = fromWhichShop;
  this.price = price;
  this.priceInWon = priceInWon;
  this.timestamp = timestamp;
};

module.exports = PriceModel;