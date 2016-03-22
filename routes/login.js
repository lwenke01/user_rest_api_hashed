'use strict';
let jwt = require('jsonwebtoken');
let User =  require('../models/User');
let auth = require('./lib/authenticate')
let bcrypt = require('bcrypt');
let express = require('express');
let router = express.Router();

router.route('/login')
  .post((req, res)=>{
    let authorizationArray = req.headers.authorization.split('');
    let method = authorizationArray[0];
    let base64 = authorizationArray[1];
    let authArray2 = new Buffer(base64, 'base64').toString().split(':');
    // let username = authArray2[0];
    let password = authArray2[1];
    console.log(method);
    console.log(name);
    console.log(password);

    User.findOne({username: req.body.username}, (err, user) =>{
      console.log('finding user');
      if (err) throw err;

      if(!user) {
        res.send({success: false, msg: 'failed to auth'});
      }

      let valid = user.compareHash(password);
      if(!valid) {
        return res.json({status: 'failed'});
      }
      res.json({token: user.generateToken()});
    });

  });
module.exports = router;
