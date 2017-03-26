let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let CardCastle = require('../../../lib/crawlers/cardcastle');
let _ = require('lodash');
let nock = require('nock');

describe('# CardCastle', function () {
  this.timeout(10000);
  let crawler = null;

  before(function () {
    crawler = new CardCastle();
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe('## Price Extract', function () {
    it('should properly extract names, scores, urls of several elements in search result', function () {
      let info = targeter('cardcastle', 'search-several');
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
      let searchRes = crawler.search('bang');
      return searchRes.should.eventually.have.lengthOf(9);
    });

    it('should properly extract list of none found', function () {
      let info = targeter('cardcastle', 'search-none');
      let melt = melter(info);

      let searchRes = crawler.search('bangagalala');
      return searchRes.should.eventually.have.lengthOf(0);
    });
  });

});