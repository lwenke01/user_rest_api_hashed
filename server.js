'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let config = require('./config');
let morgan = require('morgan');
let mongoose = require('mongoose');
let app = express();

let userRouter = express.Router();
let loginRouter = express.Router();
// let apiRouter = express.Router();
let port = process.env.PORT || 8080;
// let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
// mongoose.connect(DB_PORT);

mongoose.connect(config.database);

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', loginRouter);
app.use('/', userRouter);
// app.use('/api', apiRouter);


require('./routes/user-route', userRouter);
require('./routes/login-route', loginRouter);
// require('./routes/api-route', apiRouter);


app.listen(port, ()=>{
  console.log('Magic is happening on port ' + port);
});
