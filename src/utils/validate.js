
const { body, validationResult } = require('express-validator/check')

const errorCheck = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() })
  }
  next()
}

module.exports.word = [
  body('name').exists().withMessage('Name must exist'),
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('name').isAlphanumeric().withMessage('Name must contain only letters and numbers'),
  errorCheck
]

module.exports.game = [
  body('player').exists().withMessage('Player must exist'),
  errorCheck
]
