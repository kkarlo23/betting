<template>
  <div style="text-align: left">
    <div class="pa-md separator text-bold" :class="state.class">
      {{ sport.name }}
    </div>
    <div>
      <div v-for="tournament in sport.tournaments" :key="tournament._id">
        <tournament-preview :tournament="tournament" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
// @ is an alias to /src

import { useStore } from "vuex";
import TournamentPreview from "@/components/TournamentPreview.vue";

export default {
  name: "SportPreview",
  props: {
    sport: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    TournamentPreview,
  },
  setup(props, context) {
    const state = ref({
      class: computed(() => {
        let bgClass = "";
        switch (props.sport.name) {
          case "Football":
            bgClass = "bg-football";
            break;
          case "Basketball":
            bgClass = "bg-basketball";
            break;
          case "Handball":
            bgClass = "bg-handball";
            break;
          default:
            break;
        }
        return bgClass;
      }),
    });
    const componentMethods = {};

    return { state, componentMethods };
  },
};
</script>
