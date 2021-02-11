<template>
  <div>
    <div class="grid main-screen">
      <div>
        <div class="generic-borders rounded-borders bg-white">
          <div v-for="sport in state.sports" :key="sport.id">
            <sport-preview :sport="sport" />
          </div>
        </div>
      </div>
      <div>
        <selected-preview :games="state.checkedGames" />
      </div>
    </div>
    {{ state.data }}
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useStore, mapGetters } from "vuex";
import { Istances } from "./../rootIstances";
import GamePreview from "@/components/GamePreview.vue";
import SportPreview from "@/components/SportPreview.vue";
import SelectedPreview from "@/components/SelectedPreview.vue";
const Istance = Istances.Istance;
export default {
  name: "Home",
  components: {
    // GamePreview,
    SelectedPreview,
    SportPreview,
  },
  setup(props, context) {
    const store = useStore();
    onBeforeMount(() => {
      Istance.$root.$store.dispatch("fetchSports");
      Istance.$root.$store.dispatch("fetchTournaments");
      Istance.$root.$store.dispatch("fetchGames");
    });
    const state = ref({
      // games: computed(() => {
      //   return Istance.$root.$store.getters.gamesList;
      // }),
      sports: computed(() => {
        return Istance.$root.$store.getters.allInDesiredFormat;
      }),
      checkedGames: computed(() => {
        return Istance.$root.$store.getters.checkedGames;
      }),
    });
    const componentMethods = {};

    return { state, componentMethods };
  },
};
</script>

<style lang="scss"></style>
