var user = require('./v1/user');
var game = require('./v1/game');
var price = require('./v1/price');
var crawl = require('./v1/crawl');


module.exports = function (app, controllers) {
    app.use('/v1/user', user(controllers));
    app.use('/v1/game', game(controllers));
    app.use('/v1/price', price(controllers));
    app.use('/v1/crawl', crawl(controllers));
};