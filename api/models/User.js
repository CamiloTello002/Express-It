const mongoose = require('mongoose');
const { Schema, Model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'You need to provide a username!'],
    min: 4,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'You need to provide a password!'],
  },
});

const UserModel = Model('User', UserSchema);

module.exports = UserModel;
