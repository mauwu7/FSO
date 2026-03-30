const Blog = require('../models/blog')

const blogListHelper = async () => {
    const list_db = await Blog.find({})
    return JSON.stringify(list_db) 
}


module.exports={blogListHelper}