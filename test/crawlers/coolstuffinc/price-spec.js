let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let CoolStuffInc = require('../../../lib/crawlers/coolstuffinc');
let _ = require('lodash');
let nock = require('nock');

describe('# CoolStuffInc', () => {
  let crawler = null

  before(() => {
    crawler = new CoolStuffInc();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('## Price Extract', () => {
    it('should properly dig out price in plain prices', () => {
      let info = targeter('coolstuffinc', 'price-plain');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1000).should.eventually.deep.equal({
        type: 'CoolStuffInc',
        priceInWon: '9990',
        originalPrice: '9.99',
        stock: 20
      });
    });

    it('should properly dig out price in discounted prices', () => {
      let info = targeter('coolstuffinc', 'price-dc');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1000).should.eventually.deep.equal({
        type: 'CoolStuffInc',
        priceInWon: '19990',
        originalPrice: '19.99',
        stock: 20
      });

    });
  });

  describe('## Stock Extract', () => {
    it('should properly check if and let me know an item is non-available', () => {
      let info = targeter('coolstuffinc', 'na');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1000).should.eventually.deep.equal({
        type: 'CoolStuffInc',
        priceInWon: '8490',
        originalPrice: '8.49',
        stock: 0
      });

    });
  });
});