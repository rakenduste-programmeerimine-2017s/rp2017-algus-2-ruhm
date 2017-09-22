const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WordSchema = new Schema(
  {
    name: { type: String, required: true },
    guessedCount: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Word', WordSchema)
