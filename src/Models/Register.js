const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  teamName: {
    type: String,
    unique: true
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true
  },
  state: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  isAdmin: {
    type: String
  }
});
module.exports = mongoose.model('Register', userSchema);