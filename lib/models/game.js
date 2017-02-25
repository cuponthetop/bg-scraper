/**
 * searchTerms { market , terms[] }[]
 * urls { market, url }[]
 */

function GameModel(gamename, gamenameEn, gamenameKr, searchTerms, urls) {
  this.id = null;
  this.gamename = gamename;
  this.gamenameEn = gamenameEn;
  this.gamenameKr = gamenameKr;
  this.searchTerms = searchTerms;
  this.urls = urls;

  this.timestamp = new Date(Date.now());
};

module.exports = GameModel;