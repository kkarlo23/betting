import axios from "axios";
const client = axios.create();
const execute = async (method, route, data, params) => {
  return client({
    method,
    url: `http://localhost:3000/api/${route}`,
    data: data,
    params,
  });
};
export default {
  fetchGames: async (context, payload) => {
    try {
      const { status, data } = await execute("get", "game");
      if (status === 200) {
        context.commit("setGames", data);
        return {
          success: true,
        };
      }
    } catch (e) {
      return {
        success: false,
      };
    }
  },
  fetchTournaments: async (context, payload) => {
    try {
      const { status, data } = await execute("get", "tournament");
      if (status === 200) {
        context.commit("setTournaments", data);
        return {
          success: true,
        };
      }
    } catch (e) {
      return {
        success: false,
      };
    }
  },
  fetchSports: async (context, payload) => {
    try {
      const { status, data } = await execute("get", "sport");
      if (status === 200) {
        context.commit("setSports", data);
        return {
          success: true,
        };
      }
    } catch (e) {
      return {
        success: false,
      };
    }
  },
  createGame: async (context, payload) => {
    try {
      const { status, data } = await execute("post", "game", payload);
      if (status === 200) {
        context.commit("createGame", data);
        return {
          success: true,
        };
      }
    } catch (e) {
      return {
        success: false,
      };
    }
  },
  gameChecked: (context, payload) => {
    context.commit("gameChecked", payload);
  },
};
