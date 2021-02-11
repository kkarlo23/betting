<template>
  <div style="text-align: left">
    <div class="pa-md separator bg-grey text-bold">
      {{ tournament.name }}
    </div>
    <div v-for="game in tournament.games" :key="game.id">
      <game-preview :game="game" />
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import moment from "moment";
import GamePreview from "@/components/GamePreview.vue";
// @ is an alias to /src

import { useStore } from "vuex";

export default {
  name: "TournamentPreview",
  props: {
    tournament: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    GamePreview,
  },
  setup(props, context) {
    const state = ref({});
    const componentMethods = {};

    return { state, componentMethods };
  },
};
</script>
