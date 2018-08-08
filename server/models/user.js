const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const config = require('../config/keys');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Naming the model 'User'
const User = module.exports = mongoose.model('User', UserSchema);

// exporting getUserbyId function
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

// exporting function to Get User by username
module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

// exporting function of Adding registering user
module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

// exporting function for comparing password
module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
