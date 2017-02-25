/**
 * gamenames { nation, names[] }[]
 * searchTerms { market , terms[] }[]
 * urls { market, url }[]
 */

function GameModel(gamename, gamenameEn, gamenameKr, searchTerms, urls) {
  this.id = null;
  this.gamenames = gamenames;
  this.searchTerms = searchTerms;
  this.urls = urls;

  this.timestamp = new Date(Date.now());
};

module.exports = GameModel;