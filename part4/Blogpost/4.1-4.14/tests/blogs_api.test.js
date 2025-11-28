const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
//4.8: Blog List Tests, step 1
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)//actual number of blogs in test database
})


test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title)
  assert(titles.includes('Live on Mars'))//title in test database
})
//4.10: Blog List Tests, step 3
test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Live on Earth',
    author: 'Tommy Adds',
    url: 'http://www.yellow.com',
    likes: '1'

  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map(n => n.title)
  assert(titles.includes('Live on Earth'))
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'John Smith'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})


test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultBlog.body, blogToView)
})

//4.13 Blog List Expansions, step 1
test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(n => n.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

//4.9: Blog List Tests, step 2
test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  
  assert(response.body[0].id, 'The object must have an id property')
  assert.strictEqual(response.body[0]._id, undefined, 'The object must not have an _id property')
})

// 4.11: Blog List Tests, step 4 
test('if likes is missing, it defaults to zero', async () => {
  const newBlog = {
    title: 'Blog',
    author: 'User',
    url: 'http://default.com',
    
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
  
  assert.strictEqual(response.body.likes, 0)
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})


// 4.12: Blog List tests, step 5 
test('blog without title is not added (responds with 400)', async () => {
  const newBlog = {
    author: 'John Smith',
    url: 'http://missing.com',
    likes: 5
    
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400) 
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

// 4.12: Blog List tests, step 5 
test('blog without url is not added (responds with 400)', async () => {
  const newBlog = {
    title: 'URL Test',
    author: 'URL ',
    likes: 5
    
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400) 
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})


test('a blog post /likes/ can be updated successfully', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedLikes = blogToUpdate.likes + 20 

  const newBlogData = { 
    ...blogToUpdate, 
    likes: updatedLikes 
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlogData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  
  assert.strictEqual(response.body.likes, updatedLikes)
  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlogInDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
  assert.strictEqual(updatedBlogInDb.likes, updatedLikes)
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})



after(async () => {
  await mongoose.connection.close()
})