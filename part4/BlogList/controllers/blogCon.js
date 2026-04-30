const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  
  if('title' in request.body && 'url' in request.body){
    if(!request.body.hasOwnProperty("likes")){
      request.body.likes="0"
    }
    const body = request.body


    const blog = new Blog({
      ...body,
      user: request.user._id
    })

    const saved = await blog.save()

    request.user.blogs=request.user.blogs.concat(saved._id)

    await request.user.save()

    response.status(201).json(saved)
  }

  else {response.status(400).json({error: "missing title or url property"})}

})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(!blog){return response.status(400).json({error: "BlogId missing or not valid"})}

  if(request.user._id.toString() !== blog.user.toString()){return response.status(401).json({error: "token invalido"})}
  else{
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const updated = await Blog.findByIdAndUpdate(request.params.id, request.body, {returnDocument:'after'})
  response.status(200).json(updated)
})

module.exports = blogRouter
