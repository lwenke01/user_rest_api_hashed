'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let config = require('./config');
let morgan = require('morgan');
let mongoose = require('mongoose');
let app = express();
let User = require('./models/User');

let router = express.Router();
// let loginRouter = express.Router();
// let apiRouter = express.Router();
let port = process.env.PORT || 8080;
// let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
// mongoose.connect(DB_PORT);

mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', router);
// app.use('/', router);
// app.use('/api', apiRouter);
app.get('/', (req, res)=>{
  res.send('Hello! API is running');
});

//example
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
// });



require('./routes/user-route', router);
require('./routes/login-route', router);
// require('./routes/api-route', apiRouter);


app.listen(port, ()=>{
  console.log('Magic is happening on port ' + port);
});
