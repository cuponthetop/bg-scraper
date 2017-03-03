var fs = require('fs');
var nock = require('nock');

/**
 * read file and serve via http mock
 * @param url {string} url to hook
 * @param filename {string} filename of target http to serve with
 * @returns nock nock object created
 */
module.exports = function (url, filename) {
  let ret = nock(url).get().reply('/').replyWithFile(200, __dirname + filename);
  return ret;
};

