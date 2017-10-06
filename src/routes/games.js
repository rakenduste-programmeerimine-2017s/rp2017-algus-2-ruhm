const express = require('express')
const router = express.Router()
const validate = require('../utils/validate')
const games = require('../controllers/games')

const { asyncMiddleware } = require('../utils/common')

router.get('/', asyncMiddleware(games.getGames))
router.post('/', validate.game, asyncMiddleware(games.postGame))
router.put('/:id', asyncMiddleware(games.putGame))

router.post('/:id/word', asyncMiddleware(games.addWordToGame))

module.exports = router
