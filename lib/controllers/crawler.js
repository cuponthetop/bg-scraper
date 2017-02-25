var _ = require('lodash');
var crawlerFactory = require('../factory/crawler');

const crawlTypes = [
  'DiveDice', 'BoardLife', 'BoardM', 'BoardPia', 'Amazon', 'CardCastle', 'Cardhaus',
  'CoolStuffInc', 'MiniatureMarket', 'PopcornEdu'
];

function CrawlerController() {
  this.crawlers = [];
}

CrawlerController.prototype.getCrawlers = function () {
  return this.crawlers;
}

CrawlerController.prototype.addCrawler = function (crawlerType) {
  if (true === _.isUndefined(_.find(this.crawlers, (el) => {
    return el.getType() === crawlerType;
  }))) {
    if (true === _.isUndefined(_.find(crawlTypes, (type) => {
      return type === crawlerType;
    }))) {
      // available type
      this.crawlers.push(crawlerFactory(crawlerType));
    } else {
      console.error(`Requested Crawler ${crawlerType} is not available`);
    }
  } else {
    // crawler exists;
    console.log(`Crawler ${crawlerType} already exists`);
  }
  return this.crawlers;
}

CrawlerController.prototype.doCrawl = function (crawlFunc, ...args) {
  console.log(`Start crawling ${crawlFunc}`);

  let promises = _.map(this.crawlers, (crawler) => {
    let ret = null;
    try {
      if (typeof crawler[crawlFunc] === 'function') {
        console.log(`Crawling ${crawlFunc} using ${crawler.getType()} crawler`);
        ret = crawler[crawlFunc].call(crawler, args);
      }
    } catch (e) {
      console.error(`e.message`);
    }
    return ret;
  }).filter((result) => {
    return !_.isNull(result);
  });

  return Promise.all(promises);
};


CrawlerController.prototype.scheduleCrawler = function (crawlFunc, interval, ...args) {
// TODO::
}


module.exports = CrawlerController;