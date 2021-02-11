import { createStore } from "vuex";

import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { ref } from "vue";

export default createStore({
  state,
  getters,
  actions,
  mutations,
  // modules
});
