let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let PopcornEdu = require('../../../lib/crawlers/popcornedu');
let _ = require('lodash');
let nock = require('nock');

describe('# PopcornEdu', function () {
  let crawler = null

  before(function () {
    crawler = new PopcornEdu();
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe('## Price Extract', function () {
    it('should properly extract names, scores, urls of several elements in search result', function () {
      let info = targeter('popcornedu', 'search-several');
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
      let info = targeter('popcornedu', 'search-none');
      let melt = melter(info);

      return crawler.search('').should.eventually;

    });
  });

});