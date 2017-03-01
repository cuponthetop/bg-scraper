let _ = require('lodash');
let UserModel = require('../models/user');

function UserController(managers) {
  this.userMgr = managers.user;
  this.gameMgr = managers.game;
};

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
  req.checkBody('username', 'Invalid Username').notEmpty().isAlphanumeric();
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + result.array());
    }

    let created = new UserModel(null, username, email, new Date(Date.now()));

    this.userMgr.upsertUser(created)
      .then((saved) => {
        return res.json(saved.id);
      });
  }.bind(this));
};

UserController.prototype.removeUser = function (req, res) {
  let userInfo = req.info.user;
  let idToDelete = userInfo.id;

  this.userMgr.deleteUser(idToDelete).then((deletedID) => {
    return res.json(deletedID);
  });
};

UserController.prototype.updateUser = function (req, res) {
  req.checkBody('username', 'Invalid Username').isAlphanumeric();
  req.checkBody('email', 'Invalid email').isEmail();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).send('There have been validation errors: ' + result.array());
    }

    let userInfo = req.info.user;

    let allowedFields = ['username', 'email'];

    // update fields
    _.forEach(allowedFields, (field) => {
      let value = _.get(req.body, field, userInfo[field]);
      _.set(userInfo, field, value);
    });

    this.userMgr.upsertUser(updated)
      .then((saved) => {
        return res.json(saved.id);
      })
      .catch((err) => {
        return res.status(500).json({ msg: `Updating user failed ${err.message}` });
      });
  }.bind(this));
};

UserController.prototype.addGameSubscription = function (req, res) {
  // TODO:: use elasticsearch percolate API
  throw new Error();
};

UserController.prototype.removeGameSubscription = function (req, res) {
  // TODO::
  throw new Error();
};

module.exports = UserController;