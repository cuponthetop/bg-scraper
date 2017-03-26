let chai = require('../../helper/chai-setup');
let melter = require('../../helper/melter');
let targeter = require('../../helper/melt-targeter');
let Currency = require('../../../lib/crawlers/currency');
let _ = require('lodash');
let nock = require('nock');

describe('# Currency', () => {
  this.timeout(10000);
  let crawler = null;

  before(() => {
    crawler = new Currency();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('## USD Extract', () => {
    it('should properly dig out usd to korean won exchange rate', () => {
      let info = targeter('currency', 'test');
      let melt = melter(info);

      return crawler.getUSD().should.eventually.deep.equal(1168.3);
    });

  });

});