let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let BoardPia = require('../../../lib/crawlers/boardpia');
let _ = require('lodash');
let nock = require('nock');

describe('# BoardPia', function () {
  this.timeout(10000);
  let crawler = null;

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
       *  en: string,
       *  kr: string,
       *  img: string,
       *  url: string,
       *  price: string
       * }[]
       */
      let searchRes = crawler.search('five');
      return searchRes.should.eventually.have.lengthOf(4);
    });

    it('should properly dig out price in discounted prices', function () {
      let info = targeter('boardpia', 'search-none');
      let melt = melter(info);

      let searchRes = crawler.search('fivelalalal');
      return searchRes.should.eventually.have.lengthOf(0);
    });
  });

});