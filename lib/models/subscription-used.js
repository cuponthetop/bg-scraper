/**
 * user userID
 * game gameID
 * marketsToSubscribe []
 * additionalSearchTerms []
 */

function UsedModel(user, game, marketsToSubscribe, additionalSearchTerms) {
  this.user = user;
  this.game = game;
  this.marketsToSubscribe = marketsToSubscribe;
  this.additionalSearchTerms = additionalSearchTerms;
  this.timestamp = new Date(Date.now());
};

module.exports = UsedModel;