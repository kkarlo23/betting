const mongoose = require("mongoose");
const SportSchema = require("./sport");
const TournamentSchema = require("./tournament");
// const TeamSchema = require('./team')
const Sport = mongoose.model("Sport", SportSchema);
const Tournament = mongoose.model("Tournament", TournamentSchema);
// const Team = mongoose.model('Team', TeamSchema)

const GameSchema = new mongoose.Schema({
  date_time: {
    type: Date,
    required: [true, "Date is required"],
  },
  team_one: {
    type: String,
    required: true,
  },
  team_two: {
    type: String,
    required: true,
  },
  odds: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  duration: {
    type: Number,
    required: true,
    min: [2, "Duration Needs To Be Between 2 And 5"],
    max: [5, "Duration Needs To Be Between 2 And 5"],
  },
  // sport: {
  //   type: mongoose.Types.ObjectId,
  //   ref: 'Sport',
  //   required: true
  // },
  tournament: {
    type: mongoose.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
});
var autopopulate = function(next) {
  // this.populate('team_one')
  // this.populate('team_two')
  // this.populate('sport')
  // this.populate('tournament')
  next();
};

GameSchema.pre("findOne", autopopulate).pre("find", autopopulate);

GameSchema.statics.findByID = function(id) {
  return this.find({ _id: id });
};

const Game = mongoose.model("Game", GameSchema);

module.exports = GameSchema;
