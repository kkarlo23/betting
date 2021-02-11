<template>
  <div
    class="game cursor-pointer separator"
    @click="componentMethods.changeChecked"
  >
    <div>
      <input v-model="state.checked" type="checkbox" />
    </div>
    <div>{{ componentMethods.formatDate(game.date_time) }}</div>
    <div
      v-if="typeof state.progress == 'string'"
      :class="state.progress == 'Ended' ? 'text-red' : 'text-blue'"
    >
      {{ state.progress }}
    </div>
    <div v-else class="text-green text-bold">
      <div>{{ state.progress }}'</div>
    </div>
    <div class="teams">
      <div>{{ game.team_one }}</div>
      <div
        v-if="typeof state.progress == 'string'"
        :class="state.progress == 'Ended' ? 'text-red' : 'text-blue'"
      ></div>
      <div v-else>
        <div v-if="state.progress">
          {{ state.result.team_one }} : {{ state.result.team_two }}
        </div>
      </div>
      <div>{{ game.team_two }}</div>
    </div>
    <div>{{ game.odds }}</div>
    <div>{{ state.game }}</div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import moment from "moment";
// @ is an alias to /src
import { Istances } from "./../rootIstances";
const Istance = Istances.Istance;

import { useStore } from "vuex";

export default {
  name: "GamePreview",
  props: {
    game: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {},
  setup(props, context) {
    const store = useStore();
    const minute = 60000;
    const utcOffset = moment().utcOffset();
    const state = ref({
      result: {
        team_one: 0,
        team_two: 0,
      },
      checked: false,
      progress: null,
      inProgressFor: computed(() => {
        let start = moment(props.game.date_time, "YYYY-MM-DDTHH:mm:ss").add(
          utcOffset,
          "minutes"
        );
        let end = moment(props.game.date_time, "YYYY-MM-DDTHH:mm:ss").add(
          props.game.duration - utcOffset,
          "minutes"
        );
        let progress = Math.abs(start.utc().diff(moment(), "minutes"));
        return progress;
      }),
    });
    const componentMethods = {
      formatDate: (date) => {
        return moment(date, "YYYY-MM-DDTHH:mm:ss")
          .add(utcOffset, "minutes")
          .format("DD.MM.YYYY HH:mm");
      },
      changeChecked: () => {
        state.value.checked = !state.value.checked;
        let checked = {
          game: props.game,
          val: state.value.checked,
        };
        Istance.$root.$store.dispatch("gameChecked", checked);
      },
    };

    setInterval(() => {
      let started = startedBefore();
      if (started < 0) {
        state.value.progress = "Didnt Start";
      } else if (started > props.game.duration) {
        state.value.progress = "Ended";
      } else {
        state.value.progress = started;
      }
    }, 1000);

    setInterval(() => {
      let keys = ["team_one", "team_two"];
      let randomTeam = keys[Math.floor(Math.random() * keys.length)];
      state.value.result[randomTeam] = state.value.result[randomTeam] + 1;
    }, 20000);

    const startedBefore = () => {
      let start = moment(props.game.date_time, "YYYY-DD-MMThh:mm:ss").add(
        utcOffset,
        "minutes"
      );
      let started = moment().diff(start, "minutes");
      return started;
    };

    return { state, componentMethods };
  },
};
</script>
