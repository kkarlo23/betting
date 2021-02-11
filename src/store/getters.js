import _ from "lodash";

export default {
  gamesList: (state) => state.games.value,
  tournamentsList: (state) => state.tournaments.value,
  sportsList: (state) => state.sports.value,
  checkedGames: (state) => state.checkedGames.value,
  allInDesiredFormat: (state) => {
    let games = state.games.value;
    let tournaments = state.tournaments.value;
    let sports = state.sports.value;
    _.forEach(sports, (sport) => {
      sport.tournaments = [];
      _.forEach(tournaments, (tournament) => {
        tournament.games = [];
        _.forEach(games, (game) => {
          if (game.tournament === tournament._id) {
            tournament.games.push(game);
          }
        });
        if (tournament.sport === sport._id) {
          sport.tournaments.push(tournament);
        }
      });
    });
    return sports;
  },
};
