const express = require('express')
const router = express.Router()
const Word = require('../models/words')

router.get('/', (req, res, next) => {
  Word.find({})
    .then(words => {
      return res.json({ words })
    })
    .catch(err => {
      console.error(err)
      return res.status(400)
    })
})

router.get('/:id', (req, res, next) => {
  // console.log(req)
  const { id } = req.params
  const { sort, filter } = req.query

  console.log(sort, filter)

  return res.json({
    id,
    sortOrder: sort,
    filter
  })
})

module.exports = router
