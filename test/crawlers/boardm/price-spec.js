let chai = require('../helper/chai-setup');
let melter = require('../helper/melter');
let targeter = require('../helper/melt-targeter');
let BoardM = require('../../lib/crawlers/boardm');

describe('# BoardM', () => {
  let nock = null;
  let crawler = null

  before(() => {
    crawler = new BoardM();
  });

  beforeEach(() => {
    if (false === _.isNull(nock)) {
      nock.clear();
    }
  });

  describe('## Price Extract', () => {
    it('should properly dig out price in plain prices', () => {
      let info = targeter('boardm', 'price-plain');
      nock = melter(info);

      return crawler.getPriceInWon(info.url).should.eventually.equal({
        type: 'BoardM',
        priceInWon: '109,000',
        originalPrice: '109,000',
        stock: true
      });
    });

    it('should properly dig out price in discounted prices', () => {
      let info = targeter('boardm', 'price-dc');
      nock = melter(info);

      return crawler.getPriceInWon(info.url).should.eventually.equal({
        type: 'BoardM',
        priceInWon: '109,000',
        originalPrice: '109,000',
        stock: true
      });

    });
  });

  describe('## Stock Extract', () => {
    it('should properly check if and let me know an item is non-available', () => {

    });
  });
});