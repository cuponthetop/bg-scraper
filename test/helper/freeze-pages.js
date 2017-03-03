let freezer = require('./freezer');
let _ = require('lodash');
let path = require('path');

let webpages = require('./freeze-lists.json');

let promises = Promise.all(_.map(webpages, (pageInfo) => {
  let filepath = path.resolve(__dirname, '../data/', pageInfo.type, pageInfo.case);

  return freezer(pageInfo.url, filepath);
}));

promises.then(() => {
  process.exit(0);
}).catch(console.log.bind(console));