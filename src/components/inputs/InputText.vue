<template>
  <div>
    <div class="grid input">
      <div class="flex my-sm">{{ label }}:</div>
      <div>
        <input
          v-model="state.value"
          class="width-400"
          type="text"
          :placeholder="placeholder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
export default {
  name: "SelectedPreview",
  props: {
    val: String,
    label: String,
    placeholder: String,
  },
  components: {},
  setup(props, context) {
    const state = reactive({
      value: computed({
        get: () => {
          return props.value;
        },
        set: (val) => {
          return context.emit("modelValue", val);
        },
      }),
    });
    const componentMethods = {};
    return { state, componentMethods };
  },
};
</script>
<style lang="scss" scoped></style>
