let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let BoardM = require('../../../lib/crawlers/boardm');
let _ = require('lodash');
let nock = require('nock');

describe('# BoardM', function () {
  this.timeout(10000);
  let crawler = null;

  before(function () {
    crawler = new BoardM();
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe('## Price Extract', function () {
    it('should properly extract names, scores, urls of several elements in search result', function () {
      let info = targeter('boardm', 'search-several');
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
      let info = targeter('boardm', 'search-none');
      let melt = melter(info);

      return crawler.search('').should.eventually;

    });
  });

});