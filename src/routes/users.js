const express = require('express')
const router = express.Router()
const users = require('../controllers/users')

const { asyncMiddleware } = require('../utils/common')

const { jwtCheck, jwtEnsure } = require('../utils/jwt')

router.get('/me', jwtCheck, jwtEnsure, asyncMiddleware(users.getUser))

module.exports = router