const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
  {
  title: 'Live on Mars',
  author: 'Tom Adds',
  url: 'http://www.red.com',
  likes: 5
  },
  {
  title: 'Live on Jupyter',
  author: 'Jane Adds',
  url: 'http://www.blue.com',
  likes: 3
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'willremovesoon',
    author:'somebody',
    url:'http://someone.org',
    likes:0
    })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}




module.exports = {
  initialBlogs, nonExistingId, blogsInDb,usersInDb
}