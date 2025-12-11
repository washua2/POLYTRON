<template>
  <div
    class="min-w-[113.375rem] w-[113.375rem] pl-[1.25rem]
           h-[40rem] ipad:h-[60rem] fhd:h-[47.8125rem] qhd:h-[47.8125rem] uhd:h-[47.8125rem]
           overflow-y-auto overflow-hidden scroll-thinck"
  >
    <!-- grid：pc 4列 / ipad 3列 -->
    <div class="box w-[110.25rem] grid grid-cols-4 ipad:grid-cols-3">
      <div
        class="card relative rounded-[0.25rem] border-[0.0625rem] border-[#E4E4E7]
               overflow-hidden cursor-pointer"
        v-for="(item, index) in cameraList"
        :key="index"
        @click="handlerDetail(item.id)"
      >
        <!-- date -->
        <div class="box-time absolute top-[0.6875rem] right-[0.625rem] text-[0.75rem] text-white z-10">
          10/23/25, 7:35 AM
        </div>

        <!-- title -->
        <div class="absolute bottom-[0.75rem] left-[1rem] z-[10]">
          <div
            class="text-white text-[1rem] font-normal font-['Roboto']
                   [text-shadow:_0rem_0.25rem_0.75rem_rgb(0_0_0_/_0.60)]"
          >
            {{ item.name }}
          </div>
          <div
            class="mt-[0.3125rem] text-white text-[0.875rem] font-normal font-['Roboto']
                   [text-shadow:_0rem_0.25rem_0.75rem_rgb(0_0_0_/_0.60)]"
          >
            {{ item.desc }}
          </div>
        </div>

        <!-- mask -->
        <div class="box-mask absolute bottom-0 left-0 w-full h-[3.625rem] z-[5]"></div>

        <!-- image -->
        <img
          src="@/assets/images/test1.png"
          alt=""
          class="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const cameraList = ref(
  Array.from({ length: 11 }).map((_, i) => ({
    id: i + 1,
    name: `Office ${1 + i}F`,
    desc: "192.168.200.16",
  }))
);

const handlerDetail = (id) => {
  router.push(`/CamerasDetail/${id}`);
};
</script>

<style lang="scss" scoped>
.box {
  grid-auto-rows: 1fr;
  gap: 0.75rem;
}

/* ✅ 卡片宽度高度自适应核心 */
.card {
  width: 100%;              /* 跟随列宽 */
  aspect-ratio: 16 / 9;     /* 高度随宽度等比缩放 */
  background: #ccc;
}

/* date 背景 */
.box-time {
  display: inline-flex;
  padding: 0.25rem 0.6258rem 0.3314rem 0.3569rem;
  align-items: center;
  border-radius: 0.2543rem;
  background: rgba(32, 36, 47, 0.25);
  backdrop-filter: blur(0.1875rem);
}

/* 底部渐变遮罩 */
.box-mask {
  border-radius: 0 0 0.25rem 0.25rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 13.87%,
    #13161e 92.13%
  );
}
</style>
