const mongoose = require("mongoose");
const db = require("./../connection/connection");
const GameSchema = require("./../schema/game");
const Game = mongoose.model("Game", GameSchema);

function test(req, res) {
  return res.send("test");
}

async function findGames(req, res) {
  games = await Game.find({}).sort({ date_time: -1 });
  res.send(games);
}
async function findGame(req, res) {
  game = await Game.findOne({ _id: req.params["gameID"] });
  res.send(game);
}

function createGame(req, res) {
  const newGame = new Game(req.body);
  newGame.save(function(err) {
    if (err) {
      return res.status(400).send(err);
    }
    return res.send(newGame);
  });
}
async function updateGame(req, res) {
  const gameToUpdate = new Game(req.body);
  Game.updateOne(
    { _id: gameToUpdate._id },
    req.body,
    { upsert: false, runValidators: true },
    function(err) {
      if (err) {
        return res.status(400).send(err);
      }
      return res.send(req.body);
    }
  );
}
async function deleteGame(req, res) {
  game = await Game.deleteOne({ _id: req.params["gameID"] });
  res.send(game);
}

module.exports = {
  test: test,
  findGames: findGames,
  findGame: findGame,
  createGame: createGame,
  updateGame: updateGame,
  deleteGame: deleteGame,
};
