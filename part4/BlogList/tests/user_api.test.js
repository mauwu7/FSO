const User = require('../models/user')
const {describe, test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const apiMet = require('../utils/api_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

describe('Validation on User Schema', () => {
    
    test("when the username is not provided, it causes an error", async () => {
        await api
        .post('/api/users')
        .send({name: "Federico", password: "holaa"})
        .expect(400)
    })

    test("it fails when the password is not provided", async () => {
        await api
        .post('/api/users')
        .send({username: "vegeta777"})
        .expect(400)
    })

    test('password must be at least 3 characters long', async () => {
        const newUser = {
            username: "willyrex",
            password: "hj"
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
})

describe('Validation on DB', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash("bueanana", 10)
        const user = new User({username: 'root', passwordHash})
        await user.save()
    })

    test('it fails when try to create a user with an existing username', async () => {
        const newUser = {
            name: 'messi',
            username: 'root',
            password: 'nuevoUsuario'
        }
        const usersBefore = await apiMet.userHelper()
        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        const usersAfter =  await User.find({})
        assert.strictEqual(usersBefore.length, usersAfter.length)
    })
})

after( async () => await mongoose.connection.close())

