let _ = require('lodash');

function UserController(managers) {
  this.userMgr = managers.user;
  this.gameMgr = managers.game;
}

UserController.prototype.loadUser = function (req, res, next) {
  req.checkParams('userid', 'Invalid User ID').notEmpty().isAlphanumeric();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + result.array());
    }

    let userid = req.params.userid;
    this.userMgr.getUser(userid).then(function (user) {
      _.set(req, 'info.user', user);
      next();
    });
  }.bind(this));
};

UserController.prototype.getUser = function (req, res) {
  let userInfo = req.info.user;
  let allowedFields = ['id', 'username', 'email', 'timestamp'];

  let ret = _.pick(userInfo, allowedFields);

  return res.json(ret);
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