let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let DiveDice = require('../../../lib/crawlers/divedice');
let _ = require('lodash');
let nock = require('nock');

describe('# DiveDice', function () {
  this.timeout(10000);
  let crawler = null;

  before(function () {
    crawler = new DiveDice();
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe('## Price Extract', function () {
    // it('should properly dig out price in plain prices', function () {
    //   let info = targeter('divedice', 'price-plain');
    //   let melt = melter(info);

    //   return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
    //     type: 'DiveDice',
    //     priceInWon: '109000',
    //     originalPrice: '109000',
    //     stock: true
    //   });
    // });

    it('should properly dig out price in discounted prices', function () {
      let info = targeter('divedice', 'price-dc');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'DiveDice',
        priceInWon: '29700',
        originalPrice: '29700',
        stock: true
      });

    });
  });

  describe('## Stock Extract', function () {
    it('should properly check if and let me know an item is non-available', function () {
      let info = targeter('divedice', 'na');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'DiveDice',
        priceInWon: '53100',
        originalPrice: '53100',
        stock: false
      });

    });
  });
});