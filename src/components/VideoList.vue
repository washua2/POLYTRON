<template>
    <div class="ml-[1.875rem]">
        <div v-for="(item, index) in videoGroups" :key="index">
          <div
            class="justify-start text-[#52525B] text-[1.125rem] font-['medium'] mt-[1.75rem] mb-[1.375rem] tracking-tight"
          >
            {{ item.date }}
          </div>
          <!-- list -->
          <div
            class="box-video"
            :style="{ gridTemplateColumns: 'repeat(auto-fill, minmax(27rem, 1fr))' }"
          >
            <div
              class="w-[27rem] h-[15.5rem] rounded-[0.5rem] bg-[#D9D9D9] overflow-hidden relative"
              v-for="(v, i) in item.list"
              :key="i"
            >
              <div
                class="pl-[0.3125rem] w-[7.4375rem] h-[1.6875rem] rounded-[0.25rem] bg-[rgba(32,36,47,0.25)] flex items-center justify-start absolute top-[0.6875rem] right-[0.5625rem]"
              >
                <div
                  class="justify-start text-white text-[0.75rem] font-normal font-['Roboto'] tracking-tight"
                >
                  {{ v.time }}
                </div>
              </div>
              <!-- video -->
              <div class="w-full h-full">
                <img src="@/assets/images/test1.png" class="w-full h-full object-cover" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script setup>
import {ref,defineProps} from 'vue'
const props = defineProps({
  videoGroups: {
    type: Array,
    default: []
  }
})
// 示例数据
const videoGroups = [
  {
    date: "Today",
    list: [
      { id: 1, img: "xxx.jpg", time: "10/24/25, 8:35 AM" },
      { id: 2, img: "xxx.jpg", time: "10/24/25, 7:35 AM" },
      { id: 3, img: "xxx.jpg", time: "10/24/25, 8:35 AM" },
      { id: 4, img: "xxx.jpg", time: "10/24/25, 9:35 AM" }
    ]
  },
  {
    date: "Yesterday",
    list: [
      { id: 11, img: "xxx.jpg", time: "10/23/25, 10:25 AM" },
      { id: 12, img: "xxx.jpg", time: "10/23/25, 11:35 AM" },
      { id: 13, img: "xxx.jpg", time: "10/23/25, 12:35 AM" },
      { id: 14, img: "xxx.jpg", time: "10/23/25, 1:35 AM" }
    ]
  }
];
</script>
<style lang="scss" scoped>
.box-video {
  display: grid;
  grid-auto-rows: 1fr;
  gap: 0.75rem;
}
</style>