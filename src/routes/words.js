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
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

    const { name } = req.body
    const newWord = new Word({ name })
    const word = await newWord.save()

    return res.status(201).send({ word })
  } catch (err) {
    console.error(err)
    return res.status(400)
  }
})

router.put('/:id', [
  body('name').exists().withMessage('Name must exist'),
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('name').isAlphanumeric().withMessage('Name must contain only letters and numbers')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

    const { id } = req.params
    const { name } = req.body

    await Word.findOneAndUpdate({ _id: id }, { name })
    return res.status(200).send()
  } catch (err) {
    console.error(err)
    return res.status(400)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Word.findByIdAndUpdate(id, { deleted: new Date() })
    return res.status(200).send()
  } catch (err) {
    console.error(err)
    return res.status(400)
  }
})

module.exports = router
