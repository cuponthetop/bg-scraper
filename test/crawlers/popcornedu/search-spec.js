let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let PopcornEdu = require('../../../lib/crawlers/popcornedu');
let _ = require('lodash');
let nock = require('nock');

describe('# PopcornEdu', function () {
  this.timeout(10000);
  let crawler = null;

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
      let searchRes = crawler.search('dice');
      return searchRes.should.eventually.have.lengthOf(20);
    });

    it('should properly dig out price in discounted prices', function () {
      let info = targeter('popcornedu', 'search-none');
      let melt = melter(info);

      let searchRes = crawler.search('7lalalal');
      return searchRes.should.eventually.have.lengthOf(0);
    });
  });

});