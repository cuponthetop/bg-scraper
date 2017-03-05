/**
 * gamenames { alias: names }[]
 * searchTerms { market , terms[] }[]
 * urls { market, url }[]
 */

function GameModel(id, gamenames, searchTerms, urls, timestamp) {
  this.id = id;
  this.gamenames = gamenames;
  this.searchTerms = searchTerms;
  this.urls = urls;

  this.timestamp = timestamp;
};

module.exports = GameModel;