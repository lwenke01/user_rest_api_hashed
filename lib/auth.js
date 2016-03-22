'use strict';

module.exports = (req, res, next) =>{
  var decoded;
  try {
    var token = req.headers.authorization.split(' ')[1;]
  }
}
