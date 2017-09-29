const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema(
  {
    player: { type: String, required: true },
    gameStart: { type: Date }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Game', GameSchema)
