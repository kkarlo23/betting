<template>
  <div></div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "SelectedPreview",
  props: {},
  components: {},
  setup(props, context) {
    const state = reactive({});
    const componentMethods = {};
    return { state, componentMethods };
  },
};
</script>
<style lang="scss"></style>
