<template>
  <div class="flex items-center gap-4">

    <!-- 页码区域 -->
    <div class="flex items-center border rounded-md overflow-hidden">

      <!-- 上一页 -->
      <button
        class="w-[2.25rem] h-[2rem] flex items-center justify-center text-[#71717A] font-['bold'] hover:bg-gray-100"
        @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        <svg xmlns="http://www.w3.org/2000/svg" width="0.75rem" height="0.75rem" viewBox="0 0 12 12" fill="none">
          <path
            d="M7.98974 11.4C7.72508 11.3999 7.47128 11.2863 7.28416 11.084L3.2922 6.76926C3.1051 6.56697 3 6.29266 3 6.00663C3 5.72061 3.1051 5.44629 3.2922 5.24401L7.28416 0.929313C7.37623 0.826288 7.48635 0.744113 7.60811 0.68758C7.72987 0.631048 7.86082 0.601291 7.99334 0.600047C8.12585 0.598802 8.25726 0.626094 8.37991 0.680331C8.50256 0.734568 8.61399 0.814663 8.70769 0.915942C8.8014 1.01722 8.8755 1.13766 8.92568 1.27022C8.97586 1.40279 9.00111 1.54483 8.99996 1.68805C8.99881 1.83128 8.97128 1.97282 8.91898 2.10443C8.86667 2.23603 8.79064 2.35505 8.69532 2.45456L5.40894 6.00663L8.69532 9.55871C8.83485 9.70956 8.92987 9.90174 8.96836 10.111C9.00685 10.3202 8.98709 10.537 8.91157 10.7341C8.83605 10.9312 8.70817 11.0996 8.54409 11.2181C8.38001 11.3367 8.1871 11.4 7.98974 11.4Z"
            fill="#71717A" />
        </svg>
      </button>

      <!-- 页码列表 -->
      <div v-for="(item, index) in pageList" :key="index">

        <!-- 省略号 -->
        <span v-if="item === '...'" class="px-3 py-1 text-gray-400 font-['Roboto']">
          ...
        </span>

        <!-- 页码 -->
        <button v-else class="px-3 py-1  font-['semibold']"
          :class="item === currentPage ? `bg-gray-100 text-[#09090B] border-r-[0.0625rem] border-l-[0.0625rem]` : 'text-[#71717A] hover:bg-gray-100'"
          @click="goToPage(item)">
          {{ item }}
        </button>
      </div>

      <!-- 下一页 -->
      <button
        class="w-[2.25rem] h-[2rem] flex items-center justify-center text-[#71717A] hover:bg-gray-100 font-['semibold']"
        @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
        <svg xmlns="http://www.w3.org/2000/svg" width="0.75rem" height="0.75rem" viewBox="0 0 12 12" fill="none">
          <path
            d="M4.01026 11.4C3.8129 11.4 3.61999 11.3367 3.45591 11.2181C3.29183 11.0996 3.16395 10.9312 3.08843 10.7341C3.01291 10.537 2.99315 10.3202 3.03164 10.111C3.07013 9.90174 3.16515 9.70956 3.30468 9.55871L6.59106 6.00663L3.30468 2.45456C3.20936 2.35505 3.13333 2.23603 3.08102 2.10443C3.02872 1.97282 3.00119 1.83128 3.00004 1.68805C2.99889 1.54483 3.02414 1.40279 3.07432 1.27022C3.1245 1.13766 3.1986 1.01722 3.29231 0.915942C3.38601 0.814663 3.49744 0.734568 3.62009 0.680331C3.74274 0.626094 3.87415 0.598802 4.00666 0.600047C4.13918 0.601291 4.27013 0.631048 4.39189 0.68758C4.51365 0.744113 4.62377 0.826288 4.71584 0.929313L8.7078 5.24401C8.8949 5.44629 9 5.72061 9 6.00663C9 6.29266 8.8949 6.56697 8.7078 6.76926L4.71584 11.084C4.52872 11.2863 4.27492 11.3999 4.01026 11.4Z"
            fill="#71717A" />
        </svg>
      </button>

    </div>

    <!-- Jump to Page -->
    <div class="flex items-center gap-2">
      <span class="text-[#000000] font-[1rem] font-['light']">Jump to</span>
      <div class="border border-[#E1E4EA] rounded overflow-hidden">
        <input v-model.number="jumpPage" @keyup.enter="goToPage(jumpPage)" type="text"
          class="w-[3rem] h-[2rem] text-[1rem] text-center outline-none font-['semibold'] leading-[150%]"
          style="box-shadow:none; border:none" />
      </div>
      <span class="text-[#000000] font-[1rem] font-['light']">Page</span>
    </div>

  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  totalPages: { type: Number, required: true },
  modelValue: { type: Number, required: true }, // 当前页
});

const emit = defineEmits(["update:modelValue"]);

const currentPage = computed(() => props.modelValue);
const jumpPage = ref("");

/* ========== 生成页码显示列表 ========== */
const pageList = computed(() => {
  const pages = [];
  const total = props.totalPages;
  const cur = currentPage.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);

    if (cur > 3) pages.push("...");
    if (cur > 2) pages.push(cur - 1);

    if (cur !== 1 && cur !== total) pages.push(cur);

    if (cur < total - 1) pages.push(cur + 1);
    if (cur < total - 2) pages.push("...");

    pages.push(total);
  }
  return pages;
});

/* ========== 切换页码 ========== */
function goToPage(page) {
  if (!page || page < 1 || page > props.totalPages) return;
  emit("update:modelValue", page);
}
</script>
