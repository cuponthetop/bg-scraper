let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let Cardhaus = require('../../../lib/crawlers/cardhaus');
let _ = require('lodash');
let nock = require('nock');

describe('# Cardhaus', function () {
  this.timeout(10000);
  let crawler = null;

  before(function () {
    crawler = new Cardhaus();
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe('## Price Extract', function () {
    it('should properly extract names, scores, urls of several elements in search result', function () {
      let info = targeter('cardhaus', 'search-several');
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
      let searchRes = crawler.search('arkham+horror');
      return searchRes.should.eventually.have.lengthOf(25);
    });

    it('should properly dig out price in discounted prices', function () {
      let info = targeter('cardhaus', 'search-none');
      let melt = melter(info);

      let searchRes = crawler.search('nananana');
      return searchRes.should.eventually.have.lengthOf(0);

    });
  });

});