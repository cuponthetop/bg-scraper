function PriceModel(game, fromWhichShop, price, priceInWon) {
  this.game = game;
  this.fromWhichShop = fromWhichShop;
  this.price = price;
  this.priceInWon = priceInWon;
  this.timestamp = new Date(Date.now());
};

module.exports = PriceModel;