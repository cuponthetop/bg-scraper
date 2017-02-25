var user = require('./v1/user');
var game = require('./v1/game');
var price = require('./v1/price');


module.exports = function (app) {
    app.use('v1/user', user());
    app.use('v1/game', game());
    app.use('v1/price', price());
};