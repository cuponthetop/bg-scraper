let _ = require('lodash');

/**
 * hostname must not end with /
 */
module.exports = function (hostname, maybeRelativeURL) {
  if (false === _.isString(maybeRelativeURL)) {
    throw new Error('maybeRelativeURL is not string');
  } else if (false === _.isString(hostname)) {
    throw new Error('hostname is not string');
  }

  let ret = maybeRelativeURL;
  if (maybeRelativeURL[0] === '/' && maybeRelativeURL[1] === '/') {
    ret = 'http:' + ret;
  } else if (maybeRelativeURL[0] === '/') {
    ret = 'http://' + hostname + ret;
  }

  return ret;
};