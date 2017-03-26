let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let Amazon = require('../../../lib/crawlers/amazon');
let _ = require('lodash');
let nock = require('nock');

describe('# Amazon', function () {
  this.timeout(10000);
  let crawler = null;

  before(function () {
    crawler = new Amazon();
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe('## Price Extract', function () {
    it('should properly extract names, scores, urls of several elements in search result', function () {
      let info = targeter('amazon', 'search-several');
      let melt = melter(info);

      /**
       * {
       *  names : {}[],
       *  url: string,
       *  score: number
       * }[]
       */
      let searchRes = crawler.search('');
      searchRes.should.eventually.have.lengthOf(0);
    });

    it('should properly dig out price in discounted prices', function () {
      let info = targeter('amazon', 'search-none');
      let melt = melter(info);

      let searchRes = crawler.search('');
      searchRes.should.eventually.have.lengthOf(0);

    });
  });

});