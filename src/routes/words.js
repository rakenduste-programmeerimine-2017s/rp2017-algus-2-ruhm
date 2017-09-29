const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator/check')

const Word = require('../models/words')

router.get('/', async (req, res, next) => {
  try {
    const words = await Word.find({})
    return res.json({ words })
  } catch (err) {
    console.error(err)
    return res.status(400)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    // console.log(req)
    const { id } = req.params
    const word = await Word.findById(id)
    res.json({ word })
  } catch (err) {
    console.error(err)
    return res.status(400)
  }
})

router.post('/', [
  body('name').exists().withMessage('Name must exist'),
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('name').isAlphanumeric().withMessage('Name must contain only letters and numbers')
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

  // console.log(req.body)
  const { name } = req.body

  const newWord = new Word({ name })
  // console.log(newWord)

  newWord.save()
    .then(word => {
      return res.status(201).send({ word })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).send({error: {msg: 'something went wrong here'}})
    })
})

router.put('/:id', [
  body('name').exists().withMessage('Name must exist'),
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('name').isAlphanumeric().withMessage('Name must contain only letters and numbers')
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

  const { id } = req.params
  const { name } = req.body

  Word.findOneAndUpdate({ _id: id }, { name })
  .then(() => {
    return res.status(200).send()
  })
  .catch(err => {
    console.error(err)
    return res.status(500).send({error: {msg: 'something went wrong here'}})
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  Word.findByIdAndUpdate(id, { deleted: new Date() })
  .then(() => {
    return res.status(200).send()
  })
  .catch(err => {
    console.error(err)
    return res.status(500).send({error: {msg: 'something went wrong here'}})
  })
})

module.exports = router
