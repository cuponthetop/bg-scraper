let express = require('express');
let _ = require('lodash');

module.exports = function (controllers) {
  let crawler = express();

  let crawlerCTRL = controllers.crawler;

  crawler.post('/crawler', function (req, res) {
    req.checkBody('type', 'Invalid crawler type').notEmpty().isAlpha();

    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        return res.status(400).send('There have been validation errors: ' + result.array());
      }

      let ret = crawlerCTRL.addCrawler(req.body.type);
      res.json(ret);
    });
  });

  crawler.delete('/crawler/:crawlertype', function (req, res) {

    req.checkBody('type', 'Invalid crawler type').notEmpty().isAlpha();

    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        return res.status(400).send('There have been validation errors: ' + result.array());
      }

      let ret = crawlerCTRL.removeCrawler(req.body.type);
      if (ret === req.body.type) {
        res.json(ret);
      } else {
        res.status(404).json({});
      }
    });
  });

  crawler.get('/crawlers', function (req, res) {
    res.json(_.map(crawlerCTRL.crawlers, (crawler) => {
      return crawler.getType();
    }));
  });

  crawler.post('/job/:jobtype', function (req, res) {
    req.checkParams('jobtype', 'Invalid crawler job type').notEmpty().isAlpha();
    req.checkBody('interval', 'Invalid crawler job interval').notEmpty().isInt();

    // TODO:: Check if job is already running

    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        return res.status(400).send('There have been validation errors: ' + result.array());
      }

      crawlerCTRL.getJobInfo(req.params.jobtype).then((jobInfo) => {
        let createdJob = crawlerCTRL.scheduleCrawler(req.params.jobtype, jobInfo.crawlFunc, req.body.interval, jobInfo.chainedFunc, jobInfo.args);
        return res.json(createdJob);
      });
    });
  });

  crawler.delete('/job/:jobtype', function (req, res) {
    req.checkParams('jobtype', 'Invalid crawler job type').notEmpty().isAlpha();

    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        return res.status(400).send('There have been validation errors: ' + result.array());
      }
      // TODO:: check if it really exists
      let jobInfo = crawlerCTRL.cancelCrawler(req.params.jobtype);
      return res.json({});
    });
  });

  crawler.delete('/jobs', function (req, res) {
    let jobInfo = crawlerCTRL.cancelCrawlers();
    return res.json({});
  });


  crawler.post('/currency', function (req, res) {
    req.checkBody('interval', 'Invalid crawler job interval').notEmpty().isInt();

    // TODO:: Check if job is already running

    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        return res.status(400).send('There have been validation errors: ' + result.array());
      }

      let createdJob = crawlerCTRL.scheduleCurrency(req.body.interval);
      return res.json(createdJob);
    });
  });

  crawler.delete('/currency', function (req, res) {

    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        return res.status(400).send('There have been validation errors: ' + result.array());
      }
      // TODO:: check if it really exists
      let jobInfo = crawlerCTRL.cancelCurrency();
      return res.json({});
    });
  });

  return crawler;
};