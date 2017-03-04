let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let PopcornEdu = require('../../../lib/crawlers/popcornedu');
let _ = require('lodash');
let nock = require('nock');

describe('# PopcornEdu', function () {
  let crawler = null

  before(function () {
    crawler = new PopcornEdu();
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe('## Price Extract', function () {
    // it('should properly dig out price in plain prices', function () {
    //   let info = targeter('popcornedu', 'price-plain');
    //   let melt = melter(info);

    //   return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
    //     type: 'PopcornEdu',
    //     priceInWon: '109000',
    //     originalPrice: '109000',
    //     stock: true
    //   });
    // });

    it('should properly dig out price in discounted prices', function () {
      let info = targeter('popcornedu', 'price-dc');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'PopcornEdu',
        priceInWon: '46200',
        originalPrice: '46200',
        stock: true
      });

    });
  });

  describe('## Stock Extract', function () {
    it('should properly check if and let me know an item is non-available', function () {
      let info = targeter('popcornedu', 'na');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'PopcornEdu',
        priceInWon: '19800',
        originalPrice: '19800',
        stock: false
      });

    });
  });
});