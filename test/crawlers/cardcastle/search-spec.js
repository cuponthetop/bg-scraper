let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let CardCastle = require('../../../lib/crawlers/cardcastle');
let _ = require('lodash');
let nock = require('nock');

describe('# CardCastle', function () {
  let crawler = null

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
       *  names : {}[],
       *  url: string,
       *  score: number
       * }[]
       */
      return crawler.search('').should.eventually;
    });

    it('should properly dig out price in discounted prices', function () {
      let info = targeter('cardcastle', 'search-none');
      let melt = melter(info);

      return crawler.search('').should.eventually;

    });
  });

});