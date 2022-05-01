const users = require('../routes/users')
const jobs = require('../views/allJob')
const technicians = require('../views/alTechnician')
import supertest from 'supertest'
const express = require('express')
const chai = require('chai');

describe('Our server', function() {
    var app;
  
    // Called once before any of the tests in this block begin.
    before(function(done) {
      app = createApp();
      app.listen(function(err) {
        if (err) { return done(err); }
        done();
      });
    });
  
    it('should send a status either true or false', function() {
      request(app)
        .get('/index')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, function(err, res) {
          if (err) { return done(err); }
          callStatus = res.body.goodCall;
          expect(callStatus).to.equal(true);
          // Done
          done();
        });
    });
  
  });

  describe('GET /allJob', () => {
    it('should return a list  of all jobs', done => {
      chai
        .request(app)
        .get('/allJob')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.deep.equal(jobs);
          done();
        });
    });
  });

  describe('GET /users/allTechnician', () => {
    it('should return a list  of all technician', done => {
      chai
        .request(app)
        .get('/users/allTechnician')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.deep.equal('technicians');
          done();
        });
    });
  });