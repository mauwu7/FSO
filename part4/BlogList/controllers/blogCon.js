const blogRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  
  if('title' in request.body && 'url' in request.body){
    if(!request.body.hasOwnProperty("likes")){
      request.body.likes="0"
    }
    const blog = new Blog(request.body)
    const saved = await blog.save()
    response.status(201).json(saved)
  }
  else {response.status(400).json({error: "missing title or url property"})}

})

blogRouter.delete('/delete/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params)
  response.status(204).end()
})

module.exports=blogRouter
