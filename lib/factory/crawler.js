var _ = require('lodash');

var DD = require('../crawlers/divedice');
var BL = require('../crawlers/boardlife');
var AM = require('../crawlers/amazon');
var BM = require('../crawlers/boardm');
var BP = require('../crawlers/boardpia');
var CC = require('../crawlers/cardcastle');
var CH = require('../crawlers/cardhaus');
var CSI = require('../crawlers/coolstuffinc');
var MM = require('../crawlers/miniaturemarket');
var PE = require('../crawlers/popcorne');

function crawlerFactory(crawlerType) {
  switch (crawlerType) {
    case 'DiveDice': {
      return new DD();
    }
    case 'BoardLife': {
      return new BL();
    }
    case 'BoardM': {
      return new BM();
    }
    case 'BoardPia': {
      return new BP();
    }
    case 'Amazon': {
      return new AM();
    }
    case 'CardCastle': {
      return new CC();
    }
    case 'Cardhaus': {
      return new CH();
    }
    case 'CoolStuffInc': {
      return new CSI();
    }
    case 'MiniatureMarket': {
      return new MM();
    }
    case 'PopcornEdu': {
      return new PE();
    }
    default: {
      return null;
    }
  }
};


module.exports = crawlerFactory;