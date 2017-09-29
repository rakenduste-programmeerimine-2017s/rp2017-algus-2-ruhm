const Word = require('../models/words')

module.exports.getWords = async (req, res, next) => {
  const words = await Word.find({})
  return res.json({ words })
}

module.exports.getWord = async (req, res, next) => {
    // console.log(req)
  const { id } = req.params
  const word = await Word.findById(id)
  res.json({ word })
}

module.exports.postWord = async (req, res) => {
  const { name } = req.body
  const newWord = new Word({ name })
  const word = await newWord.save()

  return res.status(201).send({ word })
}

module.exports.putWord = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  await Word.findOneAndUpdate({ _id: id }, { name })
  return res.status(200).send()
}

module.exports.deleteWord = async (req, res) => {
  const { id } = req.params
  await Word.findByIdAndUpdate(id, { deleted: new Date() })
  return res.status(200).send()
}
