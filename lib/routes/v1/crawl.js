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

    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        return res.status(400).send('There have been validation errors: ' + result.array());
      }

      // checking if job is already registered
      if (true === crawlerCTRL.isJobRunning(req.params.jobtype)) {
        return res.status(400).send(`Requested jobtype ${req.params.jobtype} is already running`);
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
      try{
        let jobInfo = crawlerCTRL.cancelCrawler(req.params.jobtype);
        return res.json({});
      } catch (err) {
        return res.status(400).send(err.message);
      }
    });
  });

  crawler.delete('/jobs', function (req, res) {
    let jobInfo = crawlerCTRL.cancelCrawlers();
    return res.json({});
  });


  crawler.post('/currency', function (req, res) {
    req.checkBody('interval', 'Invalid crawler job interval').notEmpty().isInt();

    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        return res.status(400).send('There have been validation errors: ' + result.array());
      }

      try {
        let createdJob = crawlerCTRL.scheduleCurrency(req.body.interval);
        return res.json(createdJob);
      } catch (err) {
        return res.status(400).send(err.message);
      }
    });
  });

  crawler.delete('/currency', function (req, res) {

    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        return res.status(400).send('There have been validation errors: ' + result.array());
      }
      try{
        let jobInfo = crawlerCTRL.cancelCurrency();
        return res.json({});
      } catch (err) {
        return res.status(400).send(err.message);
      }
    });
  });

  return crawler;
};