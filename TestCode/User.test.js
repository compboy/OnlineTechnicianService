const users = require('../models/User')
import supertest from 'supertest'
const express = require('express')
var expect = require('chai').expect
mongoose = require('mongoose');

describe('Models', function () {
    var User;

    beforeEach(function (done) {
        mongoose.connect('mongodb://localhost:27017/users');
        mongoose.connection.once('connected', () => {
            mongoose.connection.db.dropDatabase();

            require('./models').registerModels();
            // This is the right model because ^registerModels set it up for us.
            User = mongoose.model('user');
            done();
        });
    });

    afterEach(function (done) {
        mongoose.disconnect();
        done();
    });

    describe('Lifecycle', function () {

        it('should not save without password', function (done) {
            var user = new User({
                email: "tousif24@gmail.com"
            });
            user.save(function (err) {
                expect(err).to.exist
                    .and.be.instanceof(Error)
                    .and.have.property('message', 'user validation failed');
                done();
            });
        });
    });
});