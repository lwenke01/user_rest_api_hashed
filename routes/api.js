'use strict';
let express = require('express');
let router = express.Router();

router.get('/', (req, res)=>{
  res.json({message: 'welcome to my app'});

});
