let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let Cardhaus = require('../../../lib/crawlers/cardhaus');
let _ = require('lodash');
let nock = require('nock');

describe('# Cardhaus', function () {
  let crawler = null

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
      return crawler.search('').should.eventually;
    });

    it('should properly dig out price in discounted prices', function () {
      let info = targeter('cardhaus', 'search-none');
      let melt = melter(info);

      return crawler.search('').should.eventually;

    });
  });

});