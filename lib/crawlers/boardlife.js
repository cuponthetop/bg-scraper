var crawl = require('../crawl');
var _ = require('lodash');
var cheerio = require('cheerio');
var ProtoCrawler = require('./proto');
var path = require('path').posix;

function BoardLifeCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
}

BoardLifeCrawler.prototype = new ProtoCrawler()

BoardLifeCrawler.prototype.getType = function () {
  return 'BoardLife';
}
BoardLifeCrawler.prototype.search = function (search_term) {
  return new Promise((resolve, reject) => {
    crawl('')
    .then((data) => {

    })
    .catch(reject);
  });
 };
BoardLifeCrawler.prototype.getPrice = function (url) {
  return new Promise((resolve, reject) => {
    crawl(url)
    .then((data) => {

    })
    .catch(reject);
  });
 };
BoardLifeCrawler.prototype.crawlList = function () {
  return new Promise((resolve, reject) => {
    crawl('http://boardlife.co.kr/bbs_list.php?tb=board_used')
      .then((data) => {
        var $ = cheerio.load(data);

        var table = $('tbody tr td table tbody tr td table tbody tr td table tbody tr');
        var children = table.filter((el) => {
          // filter where onmouseover attribute is set
        });

        var itemFunc = this.crawlItem;
        var promises = [];
        // for each tr
        children.each(function (i, elem) {
          // 2nd td / 1st td with align=center
          var itemID = $(this).find('td.num').text();
          // 6th td... sigh / 1st td with aligh=left
          var title = $(this).find('td a').text();
          // link url is relative, should resolve using posix path
          var linkURL = path.resolve('http://boardlife.co.kr/bbs_list.php?tb=board_used/', $(this).find('td a').attr('href'));
          promises.push(itemFunc(itemID, title, linkURL));
        });

        Promise.all(promises).then(resolve).catch(reject);
      })
      .catch(reject);
  });
};

BoardLifeCrawler.prototype.crawlItem = function (itemID, title, linkURL) {
  return new Promise((resolve, reject) => {
    crawl(linkURL)
      .then((data) => {
        var $ = cheerio.load(data);

        var content = $('#board_contents').text();

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

var test = new BoardLifeCrawler();
test.crawlList();
module.exports = BoardLifeCrawler;