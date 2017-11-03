const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.SECRET
const validateJwt = expressJwt({ secret: jwtSecret })
const Token = require('../models/token')
const User = require('../models/user')

module.exports.jwtEnsure = async (req, res, next) => {
  if (!req.user) {
    // token not valid or expired
    return next(new Error('Not authorized'))
  }

  try {
    // check if blacklisted
    const isBlacklisted = await Token.findOne({ token: JSON.stringify(req.user) })
    if (isBlacklisted) {
      console.log(`${req.user._id} tried blacklisted token ${isBlacklisted}`)

      return next(new Error('Not authorized'))
    }

    // check if token valid after user data changed
    const user = await User.findById(req.user._id).select('updatedAt')
    if (!user) return next(new Error('Not authorized'))

    // DO NOT allow if user changed after last token issued
    const lastPassUpdate = Math.floor(new Date(user.updatedAt) * 1 / 1000)
    if (lastPassUpdate >= req.user.iat) {
      const blacklisted = await this.blacklistToken(req.user)

      if (!blacklisted) return next(new Error('Unable to blacklist active token'))
      console.log(`${req.user._id} token blacklisted`)

      return next(new Error('Not authorized'))
    }

    // all good, proceed
    return next()
  } catch (err) {
    return next(new ServerError())
  }
}

module.exports.jwtCheck = (req, res, next) => {
  // get user from token for logging, proceed also if invalid
  return validateJwt(req, res, () => next())
}

module.exports.signToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      ts: new Date().getTime()
    },
    jwtSecret,
    { expiresIn: parseInt(process.env.TOKEN_EXPIRES_IN_SECONDS) }
  )
}

module.exports.blacklistToken = user => new Token({
  userId: user._id,
  token: JSON.stringify(user),
  expires: user.exp * 1000
}).save()