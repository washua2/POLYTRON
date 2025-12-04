<template>
    <transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-120 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
     <div class="fixed top-0 left-0 right-0 bottom-0 z-[99] flex items-center justify-center bg-[rgba(0,0,0,0.70)]">
        <GuidanceInstructions/>
    </div>
    </transition>
</template>
<script setup>
import GuidanceInstructions from "./components/GuidanceInstructions.vue"
</script>