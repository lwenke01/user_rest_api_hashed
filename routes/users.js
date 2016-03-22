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
      res.json(users);
    });
  })




module.exports = router;
