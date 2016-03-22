'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: String,
  password: String,
  admin: Boolean
});


let User = mongoose.model('User', userSchema);
module.exports = User;
