const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator/check')
const validate = require('../utils/validate')

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

router.post('/', validate.word, async (req, res) => {
  try {
    const { name } = req.body
    const newWord = new Word({ name })
    const word = await newWord.save()

    return res.status(201).send({ word })
  } catch (err) {
    console.error(err)
    return res.status(400)
  }
})

router.put('/:id', validate.word, async (req, res) => {
  try {
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
