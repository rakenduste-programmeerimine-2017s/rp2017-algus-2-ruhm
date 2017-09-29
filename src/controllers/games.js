const Game = require('../models/games')

module.exports.getGames = async (req, res, next) => {
  const games = await Game.find({})
  return res.json({ games })
}

module.exports.postGame = async (req, res, next) => {
  const { player } = req.body
  const newGame = new Game({ player })
  const game = await newGame.save()
  return res.status(201).send({ game })
}

module.exports.putGame = async (req, res, next) => {
  const { id } = req.params
  const { player, gameStart } = req.body
  let update = {}

  if (player) {
    update.player = player
  }

  if (gameStart) {
    update.gameStart = gameStart
  }

  await Game.findByIdAndUpdate(id, update)
  return res.status(200).send()
}
