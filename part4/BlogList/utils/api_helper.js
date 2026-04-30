const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const blogListHelper = async () => {
    const list_db = await Blog.find({})
    return list_db.map((blog) => blog.toJSON())
}

const userHelper = async () => {
  const usersDB = await User.find({})
  return usersDB.map((user) => user.toJSON())
}

const testData = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    }
]

const userData = {
  username: "Vegeta777",
  password: "karmaland5",
}

const generateToken = async () => {

  const user = await User.findOne()

  const userForToken = {
    username: user.username,
    id: user._id
  }
  
  const token = jwt.sign(userForToken, process.env.SECRET)
  return token
}

module.exports={blogListHelper, testData, userHelper, generateToken, userData}