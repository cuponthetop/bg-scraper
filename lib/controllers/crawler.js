let _ = require('lodash');
let crawlerFactory = require('../factory/crawler');
let scheduler = require('node-schedule');

const crawlTypes = [
  'DiveDice', 'BoardLife', 'BoardM', 'BoardPia', 'Amazon', 'CardCastle', 'Cardhaus',
  'CoolStuffInc', 'MiniatureMarket', 'PopcornEdu'
];

function CrawlerController(managers) {
  this.gameMgr = managers.game;
  this.userMgr = managers.user;
  this.postMgr = managers.post;
  this.crawlers = [];
  this.jobs = [];
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

/**
 * interval in seconds
 * chainedFunc - (crawlResult[]): Promise<>
 */
CrawlerController.prototype.scheduleCrawler = function (crawlFunc, interval, chainedFunc, ...args) {
  let rule = new scheduler.RecurrenceRule();
  rule.second = interval;

  let job = scheduler.scheduleJob(rule, function () {
    this.doCrawl(crawlFunc, args)
      .then(chainedFunc)
      .catch((err) => {
        console.error(`Error occured ${err.message}`);
      });
  }.bind(this));
  this.jobs.push(job);
  return job;
};

CrawlerController.prototype.cancelCrawler = function (jobtype) {

}

CrawlerController.prototype.cancelCrawlers = function () {
  _.forEach(this.jobs, (job) => {
    job.cancel();
  });
  this.jobs = [];
};

module.exports = CrawlerController;