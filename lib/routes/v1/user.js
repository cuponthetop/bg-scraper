let express = require('express');

module.exports = function (controllers) {
    let user = express();
    let userCTRL = controllers.user;


    user.post('/user',
        function (req, res) {

        }
    );

    user.delete('/user/:userid',
        userCTRL.loadUser.bind(userCTRL),
        function (req, res) {

        }
    );

    user.get('/user/:userid',
        userCTRL.loadUser.bind(userCTRL),
        function (req, res) {

        }
    );

    user.patch('/user/:userid',
        userCTRL.loadUser.bind(userCTRL),
        function (req, res) {

        }
    );

    return user;
};