const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/users', async (req, res) => {
  //Create new user
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
});

router.post('/users/login', (req, res) => {
  //Login a registered user
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(400).send('No user found')
      }
      const token = user.generateAuthToken();
      res.status(200).send({ user, token})
    })
    .catch(error => {
      res.status(400).send(email)
    })
});

router.get('/users/me', auth, async(req, res) => {
  // View logged in user profile
  res.send(req.user)
})

module.exports = router;