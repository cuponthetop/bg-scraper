let _ = require('lodash');
let CrawlerFactory = require('../factory/crawler');
let validateCrawler = require('../validator/crawler');
let CurrencyCrawler = require('../crawlers/currency');
let scheduler = require('node-schedule');

function CrawlerController(managers) {
  this.currencyCrawler = new CurrencyCrawler();
  this.gameMgr = managers.game;
  this.userMgr = managers.user;
  this.postMgr = managers.post;
  this.crawlers = [];
  this.jobs = [];
  this.currencyJob = null;
};

CrawlerController.prototype.getCrawlers = function () {
  return this.crawlers;
};

CrawlerController.prototype.addCrawler = function (crawlerType) {
  if (true === _.isUndefined(_.find(this.crawlers, (el) => {
    return el.getType() === crawlerType;
  }))) {
    if (false === validateCrawler(crawlerType)) {
      // available type
      this.crawlers.push(CrawlerFactory(crawlerType));
    } else {
      console.error(`Requested Crawler ${crawlerType} is not available`);
    }
  } else {
    // crawler exists;
    console.log(`Crawler ${crawlerType} already exists`);
  }
  return crawlerType;
};

CrawlerController.prototype.removeCrawler = function (crawlerType) {
  // TODO::
  // if (true === _.isUndefined(_.find(this.crawlers, (el) => {
  //   return el.getType() === crawlerType;
  // }))) {
  //   if (false === validateCrawler(crawlerType)) {
  //     // available type
  //     this.crawlers.push(CrawlerFactory(crawlerType));
  //   } else {
  //     console.error(`Requested Crawler ${crawlerType} is not available`);
  //   }
  // } else {
  //   // crawler exists;
  //   console.log(`Crawler ${crawlerType} already exists`);
  // }
  return crawlerType;
};

CrawlerController.prototype.doCrawl = function (jobtype, crawlFunc, arg) {
  console.log(`Start crawling ${crawlFunc}`);

  let promises = _.filter(this.crawlers, (crawler) => {
    return crawler.canCrawl(jobtype);
  }).map((crawler) => {
    let ret = null;
    try {
      if (typeof crawler[crawlFunc] === 'function') {
        console.log(`Crawling ${crawlFunc} using ${crawler.getType()} crawler`);
        ret = crawler[crawlFunc].call(crawler, arg);
      }
    } catch (e) {
      console.error(`${e.message}`);
    }
    return ret;
  });

  return Promise.all(promises);
};

// TODO:: direct crawler logs into different buckets...
CrawlerController.prototype.crawlOnce = function (jobtype, crawlFunc, chainedFunc, args) {
  return this.doCrawl(jobtype, crawlFunc, args)
    .then(function (results) {
      chainedFunc(_.flatten(results));
    }.bind(this))
    .catch((err) => {
      console.error(`Error occured ${err.message}`);
    });
};

/**
 * interval in seconds
 * chainedFunc - (crawlResult[]): Promise<>
 * TODO:: direct crawler logs into different buckets...
 */
CrawlerController.prototype.scheduleCrawler = function (jobtype, crawlFunc, interval, chainedFunc, args) {
  let rule = new scheduler.RecurrenceRule();
  rule.hour = Math.floor(interval / 3600);
  rule.second = interval % 60;
  rule.minute = Math.floor((interval - rule.hour * 3600) / 60);

  let job = scheduler.scheduleJob(rule, function () {
    this.doCrawl(jobtype, crawlFunc, args)
      .then(function (results) {
        chainedFunc(_.flatten(results));
      }.bind(this))
      .catch((err) => {
        console.error(`Error occured ${err.message}`);
      });
  }.bind(this));
  this.jobs.push({ crawlFunc, job });
  return job;
};

CrawlerController.prototype.scheduleCurrency = function (interval) {
  if (!_.isNull(this.currencyJob)) {
    throw new Error('Currency Job is already running');
  }

  let rule = new scheduler.RecurrenceRule();
  rule.hour = Math.floor(interval / 3600);
  rule.second = interval % 60;
  rule.minute = Math.floor((interval - rule.hour * 3600) / 60);

  let job = scheduler.scheduleJob(rule, function () {
    this.currencyCrawler.crawlCurrency()
      .then(function () { }.bind(this))
      .catch((err) => {
        console.error(`Error occured ${err.message}`);
      });
  }.bind(this));
  this.currencyJob = job;
  return job;
};

CrawlerController.prototype.cancelCurrency = function () {
  if (_.isNull(this.currencyJob)) {
    throw new Error('Currency Job is not currently running');
  }

  this.currencyJob.cancle();
  this.currencyJob = null;

  return;
};

CrawlerController.prototype.getJobInfo = function (jobtype, additionalData) {
  return new Promise(function (resolve, reject) {
    let targetCrawlFunc = this.getCrawlFuncFromJobType(jobtype);
    let chainedFunc = this.getChainedFuncFromJobType(jobtype);
    this.getAdditionalArgsFromJobType(jobtype, additionalData)
      .then((argsGot) => {
        args = argsGot;

        resolve({
          crawlFunc: targetCrawlFunc,
          chainedFunc,
          args
        });
      });

  }.bind(this));
};

CrawlerController.prototype.getChainedFuncFromJobType = function (jobtype) {
  let chainedFunc = null;

  switch (jobtype) {
    case 'price': {
      chainedFunc = function (prices) {
        return Promise.all(_.map(prices, function (price) {
          return this.gameMgr.addPrice.call(this.gameMgr, price)
        }.bind(this)))
          .then((uploaded) => { console.log(`${JSON.stringify(uploaded)}`); })
          .catch((err) => { console.log(`${err.message}`); });
      }.bind(this);
      break;
    }
    case 'post': {
      chainedFunc = function (posts) {
        return Promise.all(_.map(posts, function (post) {
          return this.postMgr.addPost.call(this.postMgr, post);
        }.bind(this)))
          .then((uploadedposts) => { console.log(`${JSON.stringify(uploadedposts)}`) })
          .catch((err) => { console.log(`${err.message}`) });
      }.bind(this);
      break;
    }
    default: {
      throw new Error('unexpected job type')
      break;
    }
  }

  return chainedFunc;
};

CrawlerController.prototype.getAdditionalArgsFromJobType = function (jobtype, additionalData) {
  return new Promise(function (resolve, reject) {
    switch (jobtype) {
      case 'price': {
        resolve({
          gameManager: this.gameMgr,
          currencyCrawler: this.currencyCrawler
        });
        break;
      }
      case 'post': {
        resolve({
        });
        break;
      }
      default: {
        throw new Error('unexpected job type')
        break;
      }
    }
  }.bind(this));
};

CrawlerController.prototype.getCrawlFuncFromJobType = function (jobtype) {
  let targetCrawlFunc = null;

  switch (jobtype) {
    case 'price': {
      targetCrawlFunc = 'getGamesPrice';
      break;
    }
    case 'post': {
      targetCrawlFunc = 'crawlList';
      break;
    }
    default: {
      throw new Error('unexpected job type')
      break;
    }
  }

  return targetCrawlFunc;
};

CrawlerController.prototype.isJobRunning = function (jobtype) {
  let targetCrawlFunc = this.getCrawlFuncFromJobType(jobtype);
  let filtered = _.filter(this.jobs, (job) => {
    return job.crawlFunc === targetCrawlFunc;
  })
  return filtered.length !== 0;
}

CrawlerController.prototype.cancelCrawler = function (jobtype) {
  let targetCrawlFunc = this.getCrawlFuncFromJobType(jobtype);
  let filtered = _.filter(this.jobs, (job) => {
    return job.crawlFunc === targetCrawlFunc;
  })
  _.forEach(filtered, (job) => {
    job.job.cancel();
  });
  _.pullAll(this.jobs, filtered);
  if (filtered.length === 0) {
    throw new Error(`No Crawl Job ${jobtype} was found to cancel`);
  }
}

CrawlerController.prototype.cancelCrawlers = function () {
  _.forEach(this.jobs, (job) => {
    job.job.cancel();
  });
  this.jobs = [];
};

module.exports = CrawlerController;