'use strict';
let express = require('express');
let bodyParser = require('body-parser');
// let morgan = require('morgan');
let mongoose = require('mongoose');
let app = express();

// let jwt = require('jsonwebtoken');
// let config = require('./config');
// let User = require('./models/User');

let port = process.env.PORT || 8080;
let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);
// app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use(morgan('dev'));

//routes
let users = require('./routes/user-route');
let login = require('./routes/login');
// let app = express();
app.use('/', users);
app.use('/', login);
// let apiRoutes = express.Router();
let router = express.Router();
// let publicRouter  = express.Router();

// app.use('/api', apiRoutes);
// app.use('/', router);
// app.use('/public', publicRouter);


// apiRoutes.get('/', (req, res)=>{
//   res.json('Hello, welcome to my awesome RESTful API');
// });

app.get('/users', auth, (req, res)=>{
  User.findOne({_id: req.decoded._id});

//   });
//   jolie.save((err)=>{
//     if (err) throw err;
//
//     console.log('saved user');
//     res.json({success: true});
//   });
// });


app.listen(port, ()=>{
  console.log('Magic is happening on port ' + port);
});
