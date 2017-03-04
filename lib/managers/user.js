let UserModel = require('../models/user');
let _ = require('lodash');

function UserManager(esClient) {
  this.client = esClient;
};

UserManager.prototype.getUser = function (userid) {
  return new Promise(function (resolve, reject) {
    this.client.get({
      index: 'esindex',
      type: 'user',
      id: userid
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }.bind(this));
};

UserManager.prototype.upsertUser = function (user) {
  return new Promise(function (resolve, reject) {
    let opts = {
      index: 'esindex',
      type: 'user',
      body: {
        username : user.username,
        email : user.email,
        timestamp : user.timestamp
      }
    };

    if (_.isNull(user.id)) {
      // insert
    } else {
      // update
      opts.id = user.id;
    }

    this.client.index(opts)
      .then((res) => {
        user.id = res.id;
        resolve(user);
      })
      .catch((err) => {
        console.error(err);
      });
  }.bind(this));
};


UserManager.prototype.upsertSubscription = function (subscription) {
  return new Promise(function (resolve, reject) {
    let opts = {
      index: 'esindex',
      type: 'subscription',
      body: {
        user : subscription.user,
        game : subscription.game,
        marketsToSubscribe : subscription.marketsToSubscribe,
        additionalSearchTerms : subscription.additionalSearchTerms,
        timestamp : user.timestamp
      }
    };

    if (_.isNull(subscription.id)) {
      // insert
    } else {
      // update
      opts.id = subscription.id;
    }

    this.client.index(opts)
      .then((res) => {
        user.id = res.id;
        resolve(user);
      })
      .catch((err) => {
        console.error(err);
      });
  }.bind(this));
};

UserManager.prototype.deleteUser = function (userid) {
  return new Promise(function (resolve, reject) {
    this.client.delete({
      index: 'esindex',
      type: 'user',
      id: userid
    })
      .then((res) => {
        resolve(userid);
      })
      .catch((err) => {
        console.error(err);
      });
  }.bind(this));
};

UserManager.prototype.deleteSubscriptionByID = function (subid) {
  return new Promise(function (resolve, reject) {
    this.client.delete({
      index: 'esindex',
      type: 'subscription',
      id: subid
    })
      .then((res) => {
        resolve(subid);
      })
      .catch((err) => {
        console.error(err);
      });
  }.bind(this));
};

UserManager.prototype.deleteSubscriptionByUserAndGame = function (userid, gameid) {
  return new Promise(function (resolve, reject) {
    this.client.search({
      index: 'esindex',
      type: 'subscription',
      body: {
        constant_score: {
          filter: {
            must: [{
              user: userid
            }, {
              game: gameid
            }]
          }
        }
      },
      size: 1,
      defaultOperator: "AND"
    })
      .then(function (res) {
        this.client.delete({
          index: 'esindex',
          type: 'subscription',
          id: res.id
        })
          .then((res) => {
            resolve(subid);
          })
          .catch((err) => {
            console.error(err);
          });
      }.bind(this))
      .catch((err) => {
        console.error(err);
      });

  }.bind(this));
};

module.exports = UserManager;