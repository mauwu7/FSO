const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  
  if('title' in request.body && 'url' in request.body){
    if(!request.body.hasOwnProperty("likes")){
      request.body.likes="0"
    }

    const user = await User.findOne()

    const blog = new Blog({
      ...request.body,
      user: user._id
    })

    const saved = await blog.save()

    user.blogs=user.blogs.concat(saved._id)

    await user.save()

    response.status(201).json(saved)
  }

  else {response.status(400).json({error: "missing title or url property"})}

})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {

  const updated = await Blog.findByIdAndUpdate(request.params.id, request.body, {returnDocument:'after'})

  response.status(200).json(updated)
})

module.exports = blogRouter
