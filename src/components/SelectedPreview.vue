<template>
  <div class="generic-borders rounded-borders bg-white grid ">
    <div v-if="!state.gamesLength" class="pa-sm">
      No games selected...
    </div>
    <div v-for="(game, key, index) in games" :key="key" class="pa-sm">
      <div class="cursor-pointer">
        <div
          class="pa-sm grid game-total "
          :class="index !== state.gamesLength - 1 ? 'separator' : ''"
        >
          <div style="display: flex">
            <div class="mr-sm">{{ index + 1 }}.</div>
            <div>{{ game.team_one }} - {{ game.team_two }}</div>
          </div>
          <div>{{ game.odds }}</div>
        </div>
      </div>
    </div>
    <div v-if="state.gamesLength" class="separator bold-separator"></div>
    <div v-if="state.gamesLength">
      <div class="pa-sm text-bold text-larger ">
        <span class="mr-sm">Total Odds:</span>
        <span class="text-green">{{ state.totalOdds }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
// @ is an alias to /src

import { useStore } from "vuex";

export default {
  name: "SelectedPreview",
  props: {
    games: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {},
  setup(props, context) {
    const store = useStore();

    const state = reactive({
      gamesLength: computed(() => {
        return Object.keys(props.games).length;
      }),
      totalOdds: computed(() => {
        let total = 1;
        let keys = Object.keys(props.games);
        keys.forEach((key) => {
          total = total * props.games[key].odds;
        });
        return total.toFixed(2);
      }),
    });
    const componentMethods = {};

    return { state, componentMethods };
  },
};
</script>
<style lang="scss">
.game-total {
  grid-template-columns: 6fr 1fr;
}
</style>
