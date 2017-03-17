let _ = require('lodash');

const crawlTypes = [
  'DiveDice', 'BoardLife', /*'BoardM', robots.txt disallowed me :(*/
  'BoardPia', 'Amazon', 'CardCastle', 'Cardhaus',
  'CoolStuffInc', 'MiniatureMarket', 'PopcornEdu'
];

module.exports = function (crawlerType) {
  return _.includes(crawlTypes, crawlerType);
}