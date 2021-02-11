const mongoose = require("mongoose");
const db = require("./../connection/connection");
const SportSchema = require("./../schema/sport");
const Sport = mongoose.model("Sport", SportSchema);

function test(req, res) {
  return res.send("test");
}

async function findSports(req, res) {
  sport = await Sport.find({}).sort({ priority: 1 });
  res.send(sport);
}
async function findSport(req, res) {
  sport = await Sport.findOne({ _id: req.params["sportID"] });
  res.send(sport);
}

function createSport(req, res) {
  const newSport = new Sport(req.body);
  newSport.save(function(err) {
    if (err) {
      return res.status(400).send(err);
    }
    return res.send(newSport);
  });
}
async function updateSport(req, res) {
  const sportToUpdate = new Sport(req.body);
  Sport.updateOne(
    { _id: sportToUpdate._id },
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
async function deleteSport(req, res) {
  sport = await Sport.deleteOne({ _id: req.params["sportID"] });
  res.send(sport);
}

module.exports = {
  test: test,
  findSports: findSports,
  findSport: findSport,
  createSport: createSport,
  updateSport: updateSport,
  deleteSport: deleteSport,
};
