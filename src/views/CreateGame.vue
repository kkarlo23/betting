<template>
  <div class="flex flex-center ">
    <div
      class="grid inputs-gap bg-white generic-borders rounded-borders pa-lg form-container"
    >
      <div>
        <div class="flex">Team One</div>
        <input
          v-model="state.newGame.team_one"
          class="width-400 height-20"
          placeholder="Type a name"
          type="text"
        />
        <div class="flex text-red">{{ state.errors.team_one }}</div>
      </div>
      <div>
        <div class="flex">Team Two</div>
        <input
          class="width-400 height-20"
          placeholder="Type a name"
          type="text"
          v-model="state.newGame.team_two"
        />
        <div class="flex text-red">{{ state.errors.team_two }}</div>
      </div>
      <div>
        <div class="flex">Odds</div>
        <input
          v-model="state.newGame.odds"
          class="width-400 height-20"
          type="number"
          placeholder="Number Between 1 and 10"
          min="1"
          max="10"
          :step="1"
        />

        <div class="flex text-red">{{ state.errors.odds }}</div>
      </div>
      <div>
        <div class="flex">Duration</div>
        <input
          v-model="state.newGame.duration"
          class="width-400 height-20"
          type="number"
          placeholder="Number Between 2 and 5"
          min="2"
          max="5"
        />
        <div class="flex text-red">{{ state.errors.duration }}</div>
      </div>
      <div>
        <div class="flex">Date</div>
        <input
          v-model="state.date"
          class="width-400 height-20 "
          placeholder="Select a date"
          type="date"
        />
        <div class="flex text-red">{{ state.errors.date }}</div>
      </div>
      <div>
        <div class="flex">Time</div>
        <input
          v-model="state.time"
          class="width-400 height-20"
          placeholder="Select time"
          type="time"
        />
        <div class="flex text-red">{{ state.errors.time }}</div>
      </div>
      <div>
        <div class="flex ">Tournament</div>

        <div v-if="!state.tournamentsLoading">
          <select
            class="width-400 height-40"
            v-model="state.newGame.tournament"
          >
            <option
              v-for="tournament in state.tournaments"
              :key="tournament._id"
              :label="tournament.name"
              :value="tournament._id"
            />
          </select>
          <div class="flex text-red">{{ state.errors.tournament }}</div>
        </div>
      </div>
      <div>
        <button
          class="button rounded-borders pa-sm text-bold generic-borders text-white cursor-pointer"
          @click="componentMethods.checkForm"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive, ref } from "vue";

import { useStore } from "vuex";
import { Istances } from "./../rootIstances";
import moment from "moment";
const Istance = Istances.Istance;

export default {
  name: "CreateGame",
  props: {},
  components: {},
  setup(props, context) {
    const utcOffset = moment().utcOffset();
    onBeforeMount(() => {
      Istance.$root.$store.dispatch("fetchTournaments").then((res) => {
        if (res.success) {
          state.value.tournamentsLoading = false;
        }
      });
    });
    const store = useStore();

    const state = ref({
      errors: {},
      time: "",
      date: "",
      newGame: {
        team_one: "",
        team_two: "",
        date_time: "",
        odds: "",
        duration: "",
        tournament: "",
      },
      tournaments: computed(() => {
        return Istance.$root.$store.getters.tournamentsList;
      }),
      tournamentsLoading: true,
    });
    const componentMethods = {
      create: (game) => {
        Istance.$root.$store.dispatch("createGame", game);
      },
      checkForm: () => {
        state.value.errors = {};

        if (!state.value.newGame.team_one) {
          state.value.errors.team_one = "Field is required";
        }
        if (!state.value.newGame.team_two) {
          state.value.errors.team_two = "Field is required";
        }
        if (!state.value.newGame.odds) {
          state.value.errors.odds = "Field is required";
        }
        if (!state.value.newGame.duration) {
          state.value.errors.duration = "Field is required";
        }
        if (!state.value.newGame.tournament) {
          state.value.errors.tournament = "Field is required";
        }
        if (!state.value.time) {
          state.value.errors.time = "Field is required";
        }
        if (!state.value.date) {
          state.value.errors.date = "Field is required";
        }
        if (Object.keys(state.value.errors).length === 0) {
          let dateTime = moment(
            state.value.date + "T" + state.value.time,
            "YYYY-DD-MMThh:mm"
          )
            .add(utcOffset)
            .format("YYYY-MM-DDTHH:mm");
          state.value.newGame.date_time = dateTime;
          componentMethods.create(state.value.newGame);
        }
      },
    };

    return { state, componentMethods };
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  width: 400px;
}
.height-20 {
  height: 20px;
}
.height-40 {
  height: 40px;
}
.inputs-gap {
  grid-row-gap: 20px;
}
.button {
  background-color: rgb(16, 122, 21);
}
</style>
