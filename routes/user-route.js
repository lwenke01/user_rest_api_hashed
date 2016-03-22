'use strict';
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let User = require('../models/User');
// let app = express();
// app.use('/', router);

router.use(bodyParser.json());


router.route('/users')
  .get((req, res)=>{
    User.find({}, (err, users)=>{
      if(err) res.send(err);
      res.json(users);
    });
  })
  .post((req, res)=>{
    console.log('POST to /users');
    var newUser = new User(req.body);
    newUser.save((err, user)=>{
      if (err) res.send(err);
      res.json(user);

    });
  });
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
