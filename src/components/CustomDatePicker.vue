<template>
  <div class="relative w-[10rem]">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="w-4 h-4 text-body" fill="none" stroke="currentColor" stroke-width="2"
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
      </svg>
    </div>

    <input
      ref="inputRef"
      type="text"
      datepicker
      class="block w-full pl-9 pr-3 py-2.5 bg-neutral-secondary-medium border border-default-medium rounded-base shadow-xs text-sm text-heading focus:ring-brand focus:border-brand"
      placeholder="Select date"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

// 必须导入这个
import "flowbite/dist/flowbite.js";

const inputRef = ref(null);

onMounted(() => {
  // 避免 SSR 或 Vite HMR 造成初始化失败
  setTimeout(() => {
    if (inputRef.value) {
      // Flowbite 会自动识别 datepicker 属性，无需 manual init
      console.log("Datepicker ready");
    }
  }, 50);
});
</script>
