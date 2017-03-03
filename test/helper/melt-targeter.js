let _ = require('lodash');
let freezed = require('./freeze-lists.json');

/**
 * @param typeIn {string} type string
 * @param caseIn {string} case string
 * @returns pageInfo pageInfo found
 */
module.exports = function (typeIn, caseIn) {
  let ret = null;

  ret = _.find(freezed, (pageInfo) => {
    return pageInfo.type === typeIn && pageInfo.case === caseIn;
  });

  return ret;
};

