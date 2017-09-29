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

module.exports.postWord = async (req, res, next) => {
  const { name } = req.body
  try {
    const newWord = new Word({ name })
    const word = await newWord.save()
    return res.status(201).send({ word })
  } catch (err) {
    if (err.code === 11000) {
      console.log(err.code)
      return res.status(422).send({
        errors: { msg: 'Duplicate key' }
      })
    }
    return next(err)
  }
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
