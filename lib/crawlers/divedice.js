var ProtoCrawler = require('./proto');

function DDCrawler() {
  ProtoCrawler.apply(this, Array.prototype.slice.call(arguments));
}

DDCrawler.prototype = new ProtoCrawler()

DDCrawler.prototype.search = function (search_term) { console.error(`Method search not implemented yet`) };
DDCrawler.prototype.getPrice = function (url) { console.error(`Method getPrice not implemented yet`) };
DDCrawler.prototype.crawlList = function () { console.error(`Method crawlList not implemented yet`) };

module.exports = DDCrawler;