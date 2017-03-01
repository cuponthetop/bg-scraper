function UserModel(id, username, email, timestamp) {
  this.id = id;
  this.username = username;
  this.email = email;
  this.timestamp = timestamp;
};

module.exports = UserModel;