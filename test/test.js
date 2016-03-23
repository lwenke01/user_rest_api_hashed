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



describe('testing /user REST api routes', () => {
  beforeEach((done)=>{
    var newUser = new User({
      user: 'Test Name'
    });
    newUser.save(( err, res)=>{
      if (err) res.send(err);
      done();
    });
  });
  afterEach((done)=>{
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });
  it('POST should post new data to /Users', (done)=>{
    request('localhost:4000')
    .post('/users')
    .send({user: 'test user'})
    .end((err, res) =>{
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body['user']).to.have.eql('test user');

      done();
    });
  });
  it('GET should receive the /users data', (done)=>{
    request('localhost:4000')
    .get('/users')
    .end((err, res)=> {
      expect(err).to.eql(null);
      expect(res).to.be.status(200);
      expect(res).to.be.json;
      console.log(res.body);
      expect(res.body).to.exist;
      done();

    });
  });
});
describe('needs an array to get id', () =>{
  beforeEach((done)=>{
    var testUser = new User({user:'test user'});
    testUser.save((err, data)=>{
      newId = data.body;
      this.testUser = data;
      done();
    });
  });
  afterEach((done)=>{
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });
  it('should be able to make a note in a beforeEach block', (done)=>{
    expect(this.testUser.user).to.eql('test user');
    expect(this.testUser).to.have.property('_id');
    done();
  });

  it('GET should receive the /users/:user data', (done)=>{
    request('localhost:4000')
    .get('/users/' + newId)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.be.status(200);
      console.log('NEW ID:' + res.body.newId);
      expect(res.body).to.exist;
      done();
    });
  });

  it('PUT should receive the /users/:user data', (done)=>{
    request('localhost:4000')
    .put('/users/' + newId)
    .send({user: 'test PUT user'})
    .end((err, res)=> {
      expect(err).to.eql(null);
      expect(res).to.be.status(200);
      console.log('CHECK' + newId);
      expect(res).to.be.json;
      done();
    });

  });
  it('DELETE should remove the users by the id', (done)=>{
    request('localhost:4000')
        .delete('/users/'+ newId)
        .end((err, res)=>{
          expect(err).to.eql(null);
          expect(res).to.be.status(200);
          expect(res).to.be.json;
          done();
        });
  });
});
