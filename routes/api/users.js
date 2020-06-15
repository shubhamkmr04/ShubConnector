const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

// @route : POST /api/users
// desc   : Register User
// access : Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(), //middleware
    check('email', 'Enter a proper email').isEmail(), //checking if these user
    check('password', 'Password should be atleast of 7 letters').isLength({
      min: 7,
    }), //credentials are correct by express-validator
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body
    try {
      //user should be unique by emailid
      let user = await User.findOne({ email })
      if (user) {
        res.status(400).json({ errors: [{ msg: 'user already exist' }] })
      }

      //fetch gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      })
      user = new User({
        name,
        email,
        password,
        avatar,
      })

      //encrypt password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

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
