let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let MiniatureMarket = require('../../../lib/crawlers/miniaturemarket');
let _ = require('lodash');
let nock = require('nock');

describe('# MiniatureMarket', () => {
  let crawler = null

  before(() => {
    crawler = new MiniatureMarket();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('## Price Extract', () => {
    // it('should properly dig out price in plain prices', () => {
    //   let info = targeter('miniaturemarket', 'price-plain');
    //   let melt = melter(info);

    //   return crawler.getPriceInWon(info.url, 1000).should.eventually.deep.equal({
    //     type: 'MiniatureMarket',
    //     priceInWon: '109000',
    //     originalPrice: '109000',
    //     stock: true
    //   });
    // });

    it('should properly dig out price in discounted prices', () => {
      let info = targeter('miniaturemarket', 'price-dc');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1000).should.eventually.deep.equal({
        type: 'MiniatureMarket',
        priceInWon: '13000',
        originalPrice: '13.00',
        stock: true
      });

    });
  });

  describe('## Stock Extract', () => {
    it('should properly check if and let me know an item is non-available', () => {
      let info = targeter('miniaturemarket', 'na');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1000).should.eventually.deep.equal({
        type: 'MiniatureMarket',
        priceInWon: '0',
        originalPrice: '0',
        stock: false
      });

    });
  });
});