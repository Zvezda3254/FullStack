const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}


const password = process.argv[2] // Password is required for all operations
const url = 'mongodb://devuser:devpass@localhost:27017/test_blogs' 
mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String, // Blog URL
  likes: Number,
})
const Blog = mongoose.model('Blog', blogSchema)


if (process.argv.length === 7) {

  const title = process.argv[3]
  const author = process.argv[4]
  const blogUrl = process.argv[5] // The URL of the blog post
  const likes = Number(process.argv[6]) // Convert to Number
  
  const blog = new Blog({
    title: title,
    author: author,
    url: blogUrl,
    likes: likes,
  })

  blog.save()
    .then(result => {
      console.log(`Added blog: "${title}" by ${author} with ${likes} likes url:${blog.url}.`)
      // Close connection after saving
      mongoose.connection.close() 
    })
    .catch(error => {
      console.error('Error saving blog:', error)
      mongoose.connection.close()
    })
    
} else {
 
  console.log('\nFetching all blogs...')
  Blog.find({}).then((result) => {
    console.log('--- Blogs ---')
    result.forEach((blog) => {
      console.log(`Title: ${blog.title}, Author: ${blog.author}, Likes: ${blog.likes},url:${blog.url}`)
    })
  
    mongoose.connection.close() 
  }).catch(error => {
    console.error(' Error fetching blogs:', error)
    mongoose.connection.close()
  })
}