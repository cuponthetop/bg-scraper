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
    if (false === _.isUndefined(_.find(crawlTypes, (type) => {
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
  return crawlerType;
}

CrawlerController.prototype.doCrawl = function (jobtype, crawlFunc, arg) {
  console.log(`Start crawling ${crawlFunc}`);

  let promises = _.filter(this.crawlers, (crawler) => {
    return crawler.canCrawl(jobtype);
  }).map((crawler) => {
    let ret = null;
    try {
      if (typeof crawler[crawlFunc] === 'function') {
        // TODO:: DO Check
        // TODO:: Implement checks on crawler side
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

/**
 * interval in seconds
 * chainedFunc - (crawlResult[]): Promise<>
 */
CrawlerController.prototype.scheduleCrawler = function (jobtype, crawlFunc, interval, chainedFunc, args) {
  let rule = new scheduler.RecurrenceRule();
  rule.second = interval;

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

CrawlerController.prototype.getJobInfo = function (jobtype) {
  return new Promise(function (resolve, reject) {
    let targetCrawlFunc = this.getCrawlFuncFromJobType(jobtype);
    let chainedFunc = this.getChainedFuncFromJobType(jobtype);
    this.getAdditionalArgsFromJobType(jobtype).then((argsGot) => {
      args = argsGot;

      resolve({
        crawlFunc: targetCrawlFunc,
        chainedFunc,
        args
      });
    });

  }.bind(this));
}

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
}

CrawlerController.prototype.getAdditionalArgsFromJobType = function (jobtype) {
  return new Promise(function (resolve, reject) {
    switch (jobtype) {
      case 'price': {
        this.gameMgr.getGames().then((gamesGot) => {
          games = gamesGot;
          resolve({ games });
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
}

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
}

CrawlerController.prototype.cancelCrawlers = function () {
  _.forEach(this.jobs, (job) => {
    job.job.cancel();
  });
  this.jobs = [];
};

module.exports = CrawlerController;