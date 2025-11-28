const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config') 


loginRouter.post('/', async (request, response, next) => { // <--- ADDED 'next'
  try {
    const { username, password } = request.body

    
    console.log(`[LOGIN] Attempting login for user: ${username}`)

    const user = await User.findOne({ username })
    
    
    if (user) {
        console.log(`[LOGIN] User found. Hash present: ${!!user.passwordHash}`)
    } else {
        console.log('[LOGIN] User not found.')
    }
  
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    
    console.log(`[LOGIN] Password correct: ${passwordCorrect}`)
    
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    
    if (!config.SECRET) {
        return response.status(500).json({ error: 'JWT SECRET is missing from server configuration.' })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

 
    console.log(`[LOGIN] Signing token for ID: ${userForToken.id}`)

   
    const token = jwt.sign(
      userForToken, 
      config.SECRET,
      { expiresIn: 60*60 } // Good practice to add an expiration
    )

    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
      
  } catch (exception) {
    
    console.error('[LOGIN ERROR] Unhandled Exception:', exception.message)
    next(exception)
  }
})

module.exports = loginRouter