const mongoose = require('mongoose');
const { Schema, model } = mongoose;

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
    min: 5,
  },
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;
