let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let PopcornEdu = require('../../../lib/crawlers/popcornedu');
let _ = require('lodash');
let nock = require('nock');

describe('# PopcornEdu', () => {
  let crawler = null

  before(() => {
    crawler = new PopcornEdu();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('## Price Extract', () => {
    // it('should properly dig out price in plain prices', () => {
    //   let info = targeter('popcornedu', 'price-plain');
    //   let melt = melter(info);

    //   return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
    //     type: 'PopcornEdu',
    //     priceInWon: '109000',
    //     originalPrice: '109000',
    //     stock: true
    //   });
    // });

    it('should properly dig out price in discounted prices', () => {
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

  describe('## Stock Extract', () => {
    it('should properly check if and let me know an item is non-available', () => {
      let info = targeter('popcornedu', 'na');
      let melt = melter(info);

      return crawler.getPriceInWon(info.url, 1).should.eventually.deep.equal({
        type: 'PopcornEdu',
        priceInWon: '0',
        originalPrice: '0',
        stock: false
      });

    });
  });
});