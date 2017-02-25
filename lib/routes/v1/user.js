var express = require('express');

module.exports = function () {
    var user = express();

    user.post('/user', function (req, res) {

    });
    user.delete('/user/:userid', function (req, res) {

    });
    user.get('/user/:userid', function (req, res) {

    });
    user.patch('/user/:userid', function (req, res) {

    });

    return user;
};