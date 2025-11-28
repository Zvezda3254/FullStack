// environmental variables
require('dotenv').config()
//additing test database
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const PORT = process.env.PORT
module.exports = { MONGODB_URI, PORT }