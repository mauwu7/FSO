const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const helper = require('../utils/api_helper')
let token;

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    let usuarioPrueba = new User(helper.userData)
    await usuarioPrueba.save()
    let blogObject=new Blog(helper.testData[0])
    await blogObject.save()
    blogObject=new Blog(helper.testData[1])
    await blogObject.save()
    token = await helper.generateToken()
})
test('returns the correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.testData.length)
})
test('blogs are returned as JSON', async () => {
    const response = await Blog.find({})
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})
test('the unique identifier property is name id', async () => {
    const response = await Blog.find({})
    assert.strictEqual(response[0].toJSON().hasOwnProperty('id'),true)
})

test('creates a new blog post', async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12, 
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const contenido = response.body.map(res => res.title)

    assert.strictEqual(response.body.length, helper.testData.length+1)
    assert(contenido.includes("Canonical string reduction"))

})
test('if the likes property is missing from the request, it will default to 0', async () => {
    const newBlog = {
        title: "Willyrex",
        url: "xxx",
        author: "ostia"
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(function(res){
        if(!('likes' in res.body)) throw new Error('Missing likes property!')
    })
    .expect(201)
    
})
test('if the title or url properties are missing, it responds Bad Request', async () => {
    const newBlog = {
        author: "Hitler",
    }
    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('succesfull delete of a single resource', async () => {
    
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    }
    const {body} = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    const blogsDB = await helper.blogListHelper()
    await api
    .delete(`/api/blogs/${body.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)
    const afterDelete = await helper.blogListHelper()
    assert.strictEqual(afterDelete.length, blogsDB.length-1)
})

test('update the information (likes) of an individual blog post', async () => {
    const updated = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 15 
    }

    const blogsDB = await helper.blogListHelper()

    await api
    .put(`/api/blogs/${blogsDB[0].id}`)
    .send(updated)
    .expect(200)
    .expect((response) => {
        if(updated.likes != response.body.likes) throw new Error('no jala')
    })
})

after(async () => await mongoose.connection.close())