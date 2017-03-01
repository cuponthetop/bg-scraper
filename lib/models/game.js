/**
 * gamenames { alias: names }[]
 * searchTerms { market , terms[] }[]
 * urls { market, url }[]
 */

function GameModel(id, gamename, gamenameEn, gamenameKr, searchTerms, urls, timestamp) {
  this.id = id;
  this.gamenames = [
    {
      alias: 'base',
      name: gamename
    },
    {
      alias: 'en',
      name: gamenameEn
    },
    {
      alias: 'kr',
      name: gamenameKr
    }
  ];
  this.searchTerms = searchTerms;
  this.urls = urls;

  this.timestamp = timestamp;
};

module.exports = GameModel;