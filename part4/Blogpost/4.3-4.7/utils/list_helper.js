const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return 0
  }

  const sumOfLikes = blogs.reduce((sum, blog) => {
 
    return sum + (blog.likes || 0)
  }, 0) 

  return sumOfLikes
}

const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return null
  }
 
  const favorite = blogs.reduce((maxBlog, currentBlog) => {
    
    return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog
  }, blogs[0]) 

  return favorite
}


const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const authorCounts = _.countBy(blogs, 'author')


  const authorBlogList = _.map(authorCounts, (blogs, author) => ({
    author,
    blogs
  }))


  return _.maxBy(authorBlogList, 'blogs')
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const groupedByAuthor = _.groupBy(blogs, 'author')
  const authorLikesList = _.map(groupedByAuthor, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes')
  }))
  return _.maxBy(authorLikesList, 'likes')
}
module.exports = {
  totalLikes,dummy,favoriteBlog,mostBlogs,mostLikes
}