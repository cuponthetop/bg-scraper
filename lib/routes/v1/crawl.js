let express = require('express');

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

  });
  crawler.get('/crawlers', function (req, res) {
    res.json(crawlerCTRL.crawlers);
  });

  crawler.post('/job/:jobtype', function (req, res) {
    req.checkParams('jobtype', 'Invalid crawler job type').notEmpty().isAlpha();
    req.checkBody('interval', 'Invalid crawler job interval').notEmpty().isInt();

    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        return res.status(400).send('There have been validation errors: ' + result.array());
      }

      let jobInfo = crawlerCTRL.getJobInfo(req.params.jobtype);
      let createdJob = crawlerCTRL.scheduleCrawler(jobInfo.crawlFunc, req.body.interval, jobInfo.chainedFunc, jobInfo.args);

      return res.json(createdJob);
    });
  });

  crawler.delete('/job/:jobtype', function (req, res) {
    req.checkParams('jobtype', 'Invalid crawler job type').notEmpty().isAlpha();

    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        return res.status(400).send('There have been validation errors: ' + result.array());
      }

      let jobInfo = crawlerCTRL.cancelCrawler(req.params.jobtype);
      return res.json({});
    });
  });

  crawler.delete('/jobs', function (req, res) {
      let jobInfo = crawlerCTRL.cancelCrawlers();
      return res.json({});
  });

  return crawler;
};