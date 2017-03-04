let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let BoardPia = require('../../../lib/crawlers/boardpia');
let _ = require('lodash');
let nock = require('nock');

describe('# BoardPia', () => {
  let crawler = null

  before(() => {
    crawler = new BoardPia();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('## Price Extract', () => {
    it('should properly dig out price in plain prices', () => {
      let info = targeter('boardpia', 'price-plain');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'BoardPia',
        priceInWon: '58000',
        originalPrice: '58000',
        stock: 12
      });
    });

    it('should properly dig out price in discounted prices', () => {
      let info = targeter('boardpia', 'price-dc');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'BoardPia',
        priceInWon: '55800',
        originalPrice: '55800',
        stock: 2873
      });

    });
  });

  describe('## Stock Extract', () => {
    it('should properly check if and let me know an item is non-available', () => {
      let info = targeter('boardpia', 'na');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'BoardPia',
        priceInWon: '0',
        originalPrice: '0',
        stock: 0
      });

    });
  });
});