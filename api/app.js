const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const game = require("./controller/game");
const sport = require("./controller/sport");
// const team = require('./controller/team')
const tournament = require("./controller/tournament");
var path = require("path");
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname + "/../dist")));
app.get("/", function(req, res) {
  res.sendFile(path.resolve(__dirname + "/../dist/index.html"));
});
//Game Routes
app.get("/api/game", (req, res) => game.findGames(req, res));
app.get("/api/game/:gameID", (req, res) => game.findGame(req, res));
app.post("/api/game", (req, res) => game.createGame(req, res));
app.put("/api/game/:gameID", (req, res) => game.updateGame(req, res));
app.delete("/api/game/:gameID", (req, res) => game.deleteGame(req, res));

//Sport Routes
app.get("/api/sport", (req, res) => sport.findSports(req, res));
app.get("/api/sport/:sportID", (req, res) => sport.findSport(req, res));
app.post("/api/sport", (req, res) => sport.createSport(req, res));
app.put("/api/sport/:sportID", (req, res) => sport.updateSport(req, res));
app.delete("/api/sport/:sportID", (req, res) => sport.deleteSport(req, res));

//Team Routes
app.get("/api/team", (req, res) => team.findTeams(req, res));
app.get("/api/team/:teamID", (req, res) => team.findTeam(req, res));
app.post("/api/team", (req, res) => team.createTeam(req, res));
app.put("/api/team/:teamID", (req, res) => team.updateTeam(req, res));
app.delete("/api/team/:teamID", (req, res) => team.deleteTeam(req, res));

//Tournamemnt Routes
app.get("/api/tournament", (req, res) => tournament.findTournaments(req, res));
app.get("/api/tournament/:tournamentID", (req, res) =>
  tournament.findTournament(req, res)
);
app.post("/api/tournament", (req, res) =>
  tournament.createTournament(req, res)
);
app.put("/api/tournament/:tournamentID", (req, res) =>
  tournament.updateTournament(req, res)
);
app.delete("/api/tournament/:tournamentID", (req, res) =>
  tournament.deleteTournament(req, res)
);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
