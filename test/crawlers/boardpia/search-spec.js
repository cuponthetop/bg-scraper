let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let BoardPia = require('../../../lib/crawlers/boardpia');
let _ = require('lodash');
let nock = require('nock');

describe('# BoardPia', function () {
  let crawler = null

  before(function () {
    crawler = new BoardPia();
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe('## Price Extract', function () {
    it('should properly extract names, scores, urls of several elements in search result', function () {
      let info = targeter('boardpia', 'search-several');
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
      let info = targeter('boardpia', 'search-none');
      let melt = melter(info);

      return crawler.search('').should.eventually;

    });
  });

});