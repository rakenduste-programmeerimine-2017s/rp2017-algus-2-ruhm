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

router.post('/', (req, res) => {
  console.log(req.body)
  const { name } = req.body

  const newWord = new Word({ name })
  console.log(newWord)

  newWord.save()
    .then(word => {
      return res.status(201).send({ word })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).send({error: {msg: 'something went wrong here'}})
    })
})

module.exports = router
