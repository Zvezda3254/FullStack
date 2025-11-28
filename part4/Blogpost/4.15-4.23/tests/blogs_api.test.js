const { test, after, beforeEach,describe,before  } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)
let token = null
let testUser = {
  username: 'user1',
  name: 'user 1',
  password: 'test'
}

before(async () => {

  await Blog.deleteMany({})
  await User.deleteMany({})
  
  
  await api
    .post('/api/users')
    .send(testUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  
  const response = await api
    .post('/api/login')
    .send({
      username: testUser.username,
      password: testUser.password,
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
 
  token = response.body.token
  

  assert.ok(token, 'Failed to retrieve JWT token in setup.')
})

beforeEach(async () => {
  
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when blogs are initially saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(e => e.title)
    assert(titles.includes('Live on Mars'))//title in test database
  })

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    assert.ok(Object.prototype.hasOwnProperty.call(response.body[0], 'id'))
    assert.ok(!Object.prototype.hasOwnProperty.call(response.body[0], '_id'))
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body.title, blogToView.title)
  })
})

describe('addition of a new blog', () => {
  
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Type-Safe Development with TypeScript',
      author: 'Jane Doe',
      url: 'http://example.com/typescript',
      likes: 15,
    }

    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert.ok(titles.includes(newBlog.title))
  })

 
  test('if likes is missing, it defaults to zero', async () => {
    const newBlog = {
      title: 'Test Blog Without Likes',
      author: 'No Likes',
      url: 'http://example.com/nolikes',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) // ADDED AUTHORIZATION
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

 
  test('blog without title is not added (responds with 400)', async () => {
    const newBlog = {
      author: 'Missing Title',
      url: 'http://example.com/missingtitle',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) // ADDED AUTHORIZATION
      .send(newBlog)
      .expect(400)
  })

  test('blog without url is not added (responds with 400)', async () => {
    const newBlog = {
      title: 'Missing URL',
      author: 'Missing URL',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) // ADDED AUTHORIZATION
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  
  test('a blog can be deleted', async () => {
    
    const blogToDeleteData = {
      title: 'deleted',
      author: 'Delete ',
      url: 'http://example.com/delete',
      likes: 1,
    }
    
    const creationResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogToDeleteData)
      .expect(201)

    const idToDelete = creationResponse.body.id
    const blogsAtStart = await helper.blogsInDb()
    
    
    await api
      .delete(`/api/blogs/${idToDelete}`)
      .set('Authorization', `Bearer ${token}`) // ADDED AUTHORIZATION
      .expect(204)

    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

    const ids = blogsAtEnd.map(b => b.id)
    assert.ok(!ids.includes(idToDelete))
  })
})

describe('updating a blog', () => {
  test('a blog post /likes/ can be updated successfully', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedLikes = blogToUpdate.likes + 1

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: updatedLikes })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, updatedLikes)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)
    assert.strictEqual(updatedBlog.likes, updatedLikes)
  })
})


after(async () => {
  await mongoose.connection.close()
})