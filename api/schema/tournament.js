const mongoose = require("mongoose");
const SportSchema = require("./sport");
const Sport = mongoose.model("Sport", SportSchema);

const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sport: {
    type: mongoose.Types.ObjectId,
    ref: "Sport",
    required: true,
  },
});

var autopopulate = function(next) {
  // this.populate('sport')
  next();
};

TournamentSchema.pre("findOne", autopopulate).pre("find", autopopulate);

module.exports = TournamentSchema;
