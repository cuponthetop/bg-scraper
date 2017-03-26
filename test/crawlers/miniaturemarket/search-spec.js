let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let MiniatureMarket = require('../../../lib/crawlers/miniaturemarket');
let _ = require('lodash');
let nock = require('nock');

describe('# MiniatureMarket', function () {
  this.timeout(10000);
  let crawler = null;

  before(function () {
    crawler = new MiniatureMarket();
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe('## Price Extract', function () {
    it('should properly extract names, scores, urls of several elements in search result', function () {
      let info = targeter('miniaturemarket', 'search-several');
      let melt = melter(info);

      /**
       * {
       *  en: string,
       *  kr: string,
       *  img: string,
       *  url: string,
       *  price: string
       * }[]
       */
      let searchRes = crawler.search('arkham');
      return searchRes.should.eventually.have.lengthOf(30);
    });

    it('should properly dig out price in discounted prices', function () {
      let info = targeter('miniaturemarket', 'search-none');
      let melt = melter(info);

      let searchRes = crawler.search('lalalalfnenen');
      return searchRes.should.eventually.have.lengthOf(0);

    });
  });

});