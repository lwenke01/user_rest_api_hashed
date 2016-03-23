'use strict';
let jwt = require('jsonwebtoken');
let User =  require('../models/User');
// let config = require('./lib/authenticate')
// let bcrypt = require('bcrypt');
// let express = require('express');
// let router = express.Router();

module.exports = (router)=>{
  router.post('/setup', (req, res)=>{
    var authorizationArray = req.headers.authorization.split(' ');
    var method = authorizationArray[0];
    var base64ed = authorizationArray[1];
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let username = authArray[0];
    let password = authArray[1];
    console.log(method);
    console.log(name);
    console.log(password);

    User.findOne({username: username}, (err, user) =>{
      console.log('finding user');
      var valid = user.compareHash(password);
      if(!valid) {
        return res.json({status: 'failed'});
      }
      var token = user.generateToken();
      res.json({token: token});
    });

  });
};
