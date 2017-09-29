const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WordSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    test: { type: Date },
    guessedCount: { type: Number, default: 0 },
    deleted: { type: Date }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Word', WordSchema)
