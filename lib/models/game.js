/**
 * gamenames { alias: names }[]
 * searchTerms { market , terms[] }[]
 * urls { market, url }[]
 */

function GameModel(id, gamename, gamenameEn, gamenameKr, searchTerms, urls, timestamp) {
  this.id = id;
  this.gamenames = [
    { base: gamename },
    { en: gamenameEn },
    { kr: gamenameKr }
  ];
  this.searchTerms = searchTerms;
  this.urls = urls;

  this.timestamp = timestamp;
};

module.exports = GameModel;