let express = require('express');

module.exports = function (controllers) {
    let crawler = express();

    let crawlerCTRL = controllers.crawler;

    crawler.post('/crawler', function (req, res) {

    });
    crawler.delete('/crawler/:crawlertype', function (req, res) {

    });
    crawler.get('/crawlers', function (req, res) {

    });

    crawler.post('/job/:jobtype', function (req, res) {

    });

    crawler.delete('/job/:jobtype', function (req, res) {

    });


    return crawler;
};