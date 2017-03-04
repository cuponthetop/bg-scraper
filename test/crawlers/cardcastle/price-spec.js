let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let CardCastle = require('../../../lib/crawlers/cardcastle');
let _ = require('lodash');
let nock = require('nock');

describe('# CardCastle', function () {
  let crawler = null

  before(function () {
    crawler = new CardCastle();
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe('## Price Extract', function () {
    it('should properly dig out price in plain prices', function () {
      let info = targeter('cardcastle', 'price-plain');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'CardCastle',
        priceInWon: '59500',
        originalPrice: '59500',
        stock: 6
      });
    });

    it('should properly dig out price in discounted prices', function () {
      let info = targeter('cardcastle', 'price-dc');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'CardCastle',
        priceInWon: '21000',
        originalPrice: '21000',
        stock: 2
      });

    });
  });

  describe('## Stock Extract', function () {
    it('should properly check if and let me know an item is non-available', function () {
      let info = targeter('cardcastle', 'na');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'CardCastle',
        priceInWon: '28000',
        originalPrice: '28000',
        stock: 0
      });

    });
  });
});