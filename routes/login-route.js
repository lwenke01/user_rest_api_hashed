'use strict';

let User =  require('../models/User');


module.exports = (router) =>{
  router.route('/login')
  .post((req, res)=>{
    let authorizationArray = req.headers.authorization.split(' ');
    // let method = authorizationArray[0];
    let base64 = authorizationArray[1];
    let authArray = new Buffer(base64, 'base64').toString().split(':');
    let username = authArray[0];
    let password = authArray[1];
    // console.log(method);
    // console.log(name);
    // console.log(password);

    User.findOne({username: username}, (err, user) =>{
      console.log('finding user');
      if (err) return res.send(err);
      try {
        var valid = user.compareHash(password);
      } catch(e) {
        return res.send(e);
      }
      if(!valid)
        return res.json({status: 'failed'});
      res.json({token: user.generateToken()});


    });

  });

};
