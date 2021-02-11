export default {
  setGames: (state, payload) => {
    state.games.value = payload;
  },
  createGame: (state, payload) => {
    state.games.value.push(payload);
  },
  setTournaments: (state, payload) => {
    state.tournaments.value = payload;
  },
  setSports: (state, payload) => {
    state.sports.value = payload;
  },
  gameChecked: (state, payload) => {
    if (!state.checkedGames.value) {
      state.checkedGames.value = {};
    }
    if (payload.val) {
      state.checkedGames.value[payload.game._id] = payload.game;
    } else {
      delete state.checkedGames.value[payload.game._id];
    }
  },
};
