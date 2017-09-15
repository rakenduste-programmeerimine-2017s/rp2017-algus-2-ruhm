const express = require('express')
const router = express.Router()
const Topic = require('../models/topics')

router.get('/', (req, res, next) => {
  Topic.find({})
    .then(topics => {
      return res.json({ topics })
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
