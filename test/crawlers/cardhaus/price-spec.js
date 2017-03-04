let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let CardHaus = require('../../../lib/crawlers/cardhaus');
let _ = require('lodash');
let nock = require('nock');

describe('# CardHaus', function () {
  let crawler = null

  before(function () {
    crawler = new CardHaus();
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe('## Price Extract', function () {
    // cardhaus does not seem to have plain price
    // it('should properly dig out price in plain prices', function () {

    it('should properly dig out price in discounted prices', function () {
      let info = targeter('cardhaus', 'price-dc');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1000).should.eventually.deep.equal({
        type: 'Cardhaus',
        priceInWon: '44990',
        originalPrice: '44.99',
        stock: 4
      });

    });
  });

  describe('## Stock Extract', function () {
    it('should properly check if and let me know an item is non-available', function () {
      let info = targeter('cardhaus', 'na');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1000).should.eventually.deep.equal({
        type: 'Cardhaus',
        priceInWon: '0',
        originalPrice: '0',
        stock: 0
      });

    });
  });
});