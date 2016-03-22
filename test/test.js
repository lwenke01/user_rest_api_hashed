'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;

var User = require(__dirname +'./../models/User');
