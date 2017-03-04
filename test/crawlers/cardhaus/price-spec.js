let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let CardHaus = require('../../../lib/crawlers/cardhaus');
let _ = require('lodash');
let nock = require('nock');

describe('# CardHaus', () => {
  let crawler = null

  before(() => {
    crawler = new CardHaus();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('## Price Extract', () => {
    // cardhaus does not seem to have plain price
    // it('should properly dig out price in plain prices', () => {

    it('should properly dig out price in discounted prices', () => {
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

  describe('## Stock Extract', () => {
    it('should properly check if and let me know an item is non-available', () => {
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