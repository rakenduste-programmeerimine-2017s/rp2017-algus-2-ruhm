const express = require('express')
const router = express.Router()
const validate = require('../utils/validate')
const words = require('../controllers/words')

const { asyncMiddleware } = require('../utils/common')

router.get('/', asyncMiddleware(words.getWords))
router.get('/:id', asyncMiddleware(words.getWord))
router.post('/', validate.word, asyncMiddleware(words.postWord))
router.put('/:id', validate.word, asyncMiddleware(words.putWord))
router.delete('/:id', asyncMiddleware(words.deleteWord))

module.exports = router
