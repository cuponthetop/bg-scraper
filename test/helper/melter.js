let fs = require('fs');
let nock = require('nock');
let path = require('path');
let url = require('url');

/**
 * read file and serve via http mock
 * @param pageInfo {type, case, url}
 * @returns nock nock object created
 */
module.exports = function (pageInfo) {
  let filepath = path.resolve(__dirname, '../data/', pageInfo.type, pageInfo.case);
  let headers = JSON.parse(fs.readFileSync(filepath + '-header'));
  let urlparsed = url.parse(pageInfo.url, false, true);
  let ret = nock(urlparsed.host).get(urlparsed.path).replyWithFile(200, filepath, headers);
  return ret;
};

