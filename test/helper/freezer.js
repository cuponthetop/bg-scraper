var rq = require('request-promise');
var fs = require('fs');

/**
 * fetch html request in binary encoding and saves it into
 * filename file
 * @param url {string} url to freeze
 * @param filename {string} filename to save into
 */
module.exports = function (url, filename) {
  var opts = {
    url,
    encoding: null,
    resolveWithFullResponse: true
  };

  return new Promise((resolve, reject) => {
    rq(opts)
      .then((res) => {
        fs.writeFileSync(filename, res);
      })
      .catch(reject);
  });
};

