const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

// User Model
const User = require('../models/User');

// @route   POST api/user
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.json({
      success: false,
      error: 'Please enter all fields'
    });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user)
      return res.json({
        success: false,
        error: 'User already exists'
      });

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'r',
      d: 'mm'
    });

    clearance = ['not_certified'];

    const newUser = new User({
      name,
      email,
      password,
      clearance,
      status: 'off',
      avatar
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign({ user: user }, keys.SECRET_OR_KEY, (err, token) => {
            res.json({
              success: true,
              message: 'new user created',
              token,
              user
            });
          });
        });
      });
    });
  });
});

module.exports = router;
