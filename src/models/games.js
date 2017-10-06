const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema(
  {
    player: { type: String, required: true },
    gameStart: { type: Date },
    words: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Word' }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Game', GameSchema)
