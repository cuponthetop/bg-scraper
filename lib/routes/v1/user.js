let express = require('express');

module.exports = function (controllers) {
  let user = express();
  let userCTRL = controllers.user;

  user.post('/user',
    userCTRL.addUser.bind(userCTRL)
  );

  user.delete('/user/:userid',
    userCTRL.loadUser.bind(userCTRL),
    userCTRL.removeUser.bind(userCTRL)
  );

  user.get('/user/:userid',
    userCTRL.loadUser.bind(userCTRL),
    userCTRL.getUser.bind(userCTRL)
  );

  user.patch('/user/:userid',
    userCTRL.loadUser.bind(userCTRL),
    userCTRL.updateUser.bind(userCTRL)
  );

  return user;
};