const express = require('express')
const router = express.Router()
const validate = require('../utils/validate')
const words = require('../controllers/words')

router.get('/', words.getWords)
router.get('/:id', words.getWord)
router.post('/', validate.word, words.postWord)
router.put('/:id', validate.word, words.putWord)
router.delete('/:id', words.deleteWord)

module.exports = router
