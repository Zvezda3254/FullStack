// environmental variables
require('dotenv').config()
//additing test database
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
const SECRET = process.env.SECRET
console.log('--- DEBUG: JWT Secret Loaded:', SECRET ? 'YES (Length: ' + SECRET.length + ')' : 'NO ---')
const PORT = process.env.PORT
module.exports = { MONGODB_URI, PORT, SECRET }