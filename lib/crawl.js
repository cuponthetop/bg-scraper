var rq = require('request-promise');
var iconv = require('iconv-lite');
var _ = require('lodash');
var charset = require('charset');
var jschardet = require('jschardet');

module.exports = function (url) {
    var opts = {
        url,
        encoding: null,
        resolveWithFullResponse: true
    };

    return new Promise((resolve, reject) => {
        rq(opts)
            .then((res) => {
                var enc = charset(res.headers, res.body);
                enc = enc || jschardet.detect(res.body).encoding.toLowerCase();
                var ret = iconv.decode(res.body, enc);
                resolve(ret);
            })
            .catch(reject);
    });
}

