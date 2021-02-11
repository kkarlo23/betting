const mongoose = require("mongoose");
//atlasdb
let connStr =
  "mongodb+srv://test:test@cluster0.v1pkm.mongodb.net/betting?retryWrites=true&w=majority";

// let connStr = "mongodb://localhost:27017/betting";

mongoose.connect(connStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected");
});

module.exports = db;
