const users = require('../routes/users')
import supertest from 'supertest'
const express = require('express')

describe('post /login', () => {

    describe('Given a username and password', async () => {
        test('Should respond with a 200 starus code', () => {
            const response = request(router).post('/login').send({
                username: 'name',
                password: 'password'
            })
            expect(response.statusCode).toBe(200)
        })
    })
    describe('When the username and password are missing', () => {

    })
})