function UserModel(username, email) {
  this.id = null;
  this.username = username;
  this.email = email;
  this.timestamp = new Date(Date.now());
};

module.exports = UserModel;