const mongoose = require("mongoose");
const db = require("./../connection/connection");
const TournamentSchema = require("./../schema/tournament");
const Tournament = mongoose.model("Tournament", TournamentSchema);

function test(req, res) {
  return res.send("test");
}

async function findTournaments(req, res) {
  tournament = await Tournament.find({}).sort({ priority: 1 });
  res.send(tournament);
}
async function findTournament(req, res) {
  tournament = await Tournament.findOne({ _id: req.params["tournamentID"] });
  res.send(tournament);
}

function createTournament(req, res) {
  const newTournament = new Tournament(req.body);
  newTournament.save(function(err) {
    if (err) {
      return res.status(400).send(err);
    }
    return res.send(newTournament);
  });
}
async function updateTournament(req, res) {
  const tournamentToUpdate = new Tournament(req.body);
  Tournament.updateOne(
    { _id: tournamentToUpdate._id },
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
async function deleteTournament(req, res) {
  tournament = await Tournament.deleteOne({ _id: req.params["tournamentID"] });
  res.send(tournament);
}

module.exports = {
  test: test,
  findTournaments: findTournaments,
  findTournament: findTournament,
  createTournament: createTournament,
  updateTournament: updateTournament,
  deleteTournament: deleteTournament,
};
