let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let BoardM = require('../../../lib/crawlers/boardm');
let _ = require('lodash');
let nock = require('nock');

describe('# BoardM', () => {
  let crawler = null

  before(() => {
    crawler = new BoardM();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('## Price Extract', () => {
    it('should properly dig out price in plain prices', () => {
      let info = targeter('boardm', 'price-plain');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url).should.eventually.deep.equal({
        type: 'BoardM',
        priceInWon: '109000',
        originalPrice: '109000',
        stock: true
      });
    });

    it('should properly dig out price in discounted prices', () => {
      let info = targeter('boardm', 'price-dc');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url).should.eventually.deep.equal({
        type: 'BoardM',
        priceInWon: '25200',
        originalPrice: '25200',
        stock: true
      });

    });
  });

  describe('## Stock Extract', () => {
    it('should properly check if and let me know an item is non-available', () => {
      let info = targeter('boardm', 'na');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url).should.eventually.deep.equal({
        type: 'BoardM',
        priceInWon: '0',
        originalPrice: '0',
        stock: false
      });

    });
  });
});