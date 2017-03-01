let _ = require('lodash');

function UserController(managers) {
  this.userMgr = managers.user;
  this.gameMgr = managers.game;
}

UserController.prototype.loadUser = function (req, res, next) {
  // TODO::
  throw new Error();
};

UserController.prototype.getUser = function (req, res) {
  // TODO::
  throw new Error();
};

UserController.prototype.addUser = function (req, res) {
  // TODO::
  throw new Error();
};

UserController.prototype.removeUser = function (req, res) {
  // TODO::
  throw new Error();
};

UserController.prototype.updateUser = function (req, res) {
  // TODO::
  throw new Error();
};

UserController.prototype.addGameSubscription = function (req, res) {
  // TODO::
  throw new Error();
};

UserController.prototype.removeGameSubscription = function (req, res) {
  // TODO::
  throw new Error();
};

module.exports = UserController;