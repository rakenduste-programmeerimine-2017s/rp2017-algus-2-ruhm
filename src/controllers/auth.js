const User = require('../models/user')

module.exports.localLogin = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ 'login.email': email })
  if (!user) { return res.status(400).send({ msg: 'Email or password incorrect' }) }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) { return res.status(400).send({ msg: 'Email or password incorrect' }) }

  return res.json({ token: user._id })
}

module.exports.localSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const existingUser = await User.findOne({ 'login.email': email })
  if (existingUser) { return res.status(400).send({ msg: 'email already exists' }) }

  const user = await new User({
    profile: {
      firstName,
      lastName
    },
    login: {
      email,
      password
    }
  }).save()

  return res.json({ message: 'User created' })
}