const Blog = require('../models/blog')

const initialBlogs = [
  {
  title: 'Live on Mars',
  author: 'Tom Adds',
  url: 'http://www.red.com',
  likes: '5'
  },
  {
  title: 'Live on Jupyter',
  author: 'Jane Adds',
  url: 'http://www.blue.com',
  likes: '3'
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'willremovesoon'
    })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}