<template>
  <!-- 图标真正继承 color 的关键在于 svg 的 color，而不是 use 的 fill -->
  <svg :style="{ width, height, color }">
    <!-- <use :href="prifix + icon" :fill="color"></use> -->
   <use :xlink:href="prifix + icon" :fill="color"></use>
  </svg>
</template>

<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  prifix: {
    type: String,
    default: "#icon-",
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: "#fff"
  },
  width: {
    type: String,
    default: "1rem"
  },
  height: {
    type: String,
    default: "1rem"
  }
});

const { prifix, icon, color, width, height } = toRefs(props);
</script>

<style scoped></style>
