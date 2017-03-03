let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let CardCastle = require('../../../lib/crawlers/cardcastle');
let _ = require('lodash');
let nock = require('nock');

describe('# CardCastle', () => {
  let crawler = null

  before(() => {
    crawler = new CardCastle();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('## Price Extract', () => {
    it('should properly dig out price in plain prices', () => {
      let info = targeter('cardcastle', 'price-plain');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'CardCastle',
        priceInWon: '109000',
        originalPrice: '109000',
        stock: true
      });
    });

    it('should properly dig out price in discounted prices', () => {
      let info = targeter('cardcastle', 'price-dc');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'CardCastle',
        priceInWon: '25200',
        originalPrice: '25200',
        stock: true
      });

    });
  });

  describe('## Stock Extract', () => {
    it('should properly check if and let me know an item is non-available', () => {
      let info = targeter('cardcastle', 'na');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'CardCastle',
        priceInWon: '0',
        originalPrice: '0',
        stock: false
      });

    });
  });
});