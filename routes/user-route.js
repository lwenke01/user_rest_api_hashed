'use strict';
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let User = require('../models/User');
// let app = express();
// app.use('/', router);

router.use(bodyParser.json());

// router.get('/', (req, res)=>{
//   res.json({msg: 'Welcome to my cool api'});
// });

router.route('/users')
  .get((req, res)=>{
    User.find({}, (err, users)=>{
      if(err) res.send(err);
      res.json({data: users});
    });
  })
  // app.get('/users', (req, res)=>{
  //   var fran = new User({
  //     username: 'Fran D',
  //     password: 'hairday',
  //     group: 'green'
  //   });
  //   fran.save((err, user)=>{
  //     if(err) res.send(err);
  //     console.log('User saved');
  //     res.json({success: true, data: user});
  //   });
  // })
  .post((req, res)=>{
    console.log('POST to /users');
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      group: req.body.group
    });
    newUser.save((err, user)=>{
      if (err) res.send(err);
      res.json({success: true, data: user});
    });
  });
  // });

router.route('/users/:user')
  .get((req, res)=>{
    console.log('GET /users/:user was hit');
    User.findById(req.params.username,(err, user)=>{
      if(err) res.send(err);
      res.json(user);

    });
  })
  .put((req, res)=>{
    console.log('PUT /users:user was hit');
    User.findByIdAndUpdate(req.params.username, req.body, (err, user)=>{
      if (err) res.send(err);
      res.json(user);

    });
  })
  .delete((req, res)=>{
    console.log('DELETE was hit for /users/:user');
    User.findById({username: req.params.username},(err, user)=>{
      console.log(user);
      User.remove((err, user)=>{
        console.log(user + 'is now deleted');
        res.json({msg: 'deleted user'});
      });
    });

  });
// router.route('/authenticate')
//   .post((req, res)=>{
//     User.findOne()
//
//   })




module.exports = router;
