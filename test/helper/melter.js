let fs = require('fs');
let nock = require('nock');
let path = require('path');

/**
 * read file and serve via http mock
 * @param pageInfo {type, case, url}
 * @returns nock nock object created
 */
module.exports = function (pageInfo) {
  let filepath = path.resolve(__dirname, '../data/', pageInfo.type, pageInfo.case);
  let headers = JSON.parse(fs.readFileSync(filepath + '-header'));
  let ret = nock(url).get().reply('/').replyWithFile(200, filepath, headers);
  return ret;
};

