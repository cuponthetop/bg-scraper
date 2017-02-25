var crawl = require('../crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');

function DDCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
}

DDCrawler.prototype = new ProtoCrawler()

DDCrawler.prototype.getType = function () {
  return 'DiveDice';
}
DDCrawler.prototype.search = function (search_term) {
  return new Promise((resolve, reject) => {
    crawl('')
    .then((data) => {

    })
    .catch(reject);
  });
 };
DDCrawler.prototype.getPrice = function (url) {
  return new Promise((resolve, reject) => {
    crawl('')
    .then((data) => {

    })
    .catch(reject);
  });
 };
DDCrawler.prototype.crawlList = function () {
  return new Promise((resolve, reject) => {
    crawl('http://www.divedice.com/web_dev/bbs/bbs_list_type01.php?type=f&c_type=1&pagenum=1&cateid=A002A021A006')
      .then((data) => {
        var $ = cheerio.load(data);

        var table = $('.bbs_list.bbs_list01 table tbody');
        var children = table.children();

        var itemFunc = this.crawlItem;
        var promises = [];
        // for each tr
        children.each(function (i, elem) {
          var itemID = $(this).find('td.num').text();
          var title = $(this).find('td p a span').text();
          var linkURL = 'http://www.divedice.com/web_dev/bbs/' + $(this).find('td p a').attr('href');
          promises.push(itemFunc(itemID, title, linkURL));
        });

        Promise.all(promises).then(resolve).catch(reject);
      })
      .catch(reject);
  });
};

DDCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  return new Promise((resolve, reject) => {
    crawl(linkURL)
      .then((data) => {
        var $ = cheerio.load(data);

        var content = $('.cont_txt').text();

        resolve({
          itemID,
          title,
          linkURL,
          content
        });
      })
      .catch(reject);
  });
};

var test = new DDCrawler();
test.crawlList();
module.exports = DDCrawler;