const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const config = require('config')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

// @route : GET /api/auth
// desc   : test route
// access : Private
router.get('/', auth, async (req, res) => {
  //take token (means by a particular user) and return user data expect password
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route : POST /api/auth
// desc   : Authenticate user and get token
// access : Public
router.post(
  '/',
  [
    check('email', 'enter proper email').isEmail(), //checking if these user
    check('password', 'password is required').exists(), //credentials are correct by express-validator
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'wrong credentials' }] }) // Invalid credentials
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'wrong password' }] }) // Invalid credentials
      }

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        config.get('jwtsecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
