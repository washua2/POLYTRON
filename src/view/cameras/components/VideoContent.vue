<template>
  <div class="w-[113.375rem] flex items-start">
    <!-- 左侧 Search -->
    <div
      class="mt-[4.8125rem] pl-[1.25rem] flex-shrink-0 "
      v-if="isUploadImage"
    >
      <SearchPhoto />
    </div>

    <!-- 右侧内容 -->
    <div class="flex-1 min-w-0">
      <div
        class="mt-[2.125rem] pl-[1.25rem] mb-[1.125rem]
               text-[#09090B] text-[1rem] font-normal font-['Roboto'] tracking-tight"
      >
        93 Results Found
      </div>

      <!-- scroll area -->
      <div
        class="pl-[1.25rem]
               h-[40rem] ipad:h-[60rem] fhd:h-[47.8125rem] qhd:h-[47.8125rem] uhd:h-[47.8125rem]
               overflow-y-auto overflow-hidden scroll-thinck pr-[1.5rem]"
      >
        <!-- ✅ grid：PC 4 列 / iPad 3 列 -->
        <div class="box grid grid-cols-4 ipad:grid-cols-3 gap-[0.75rem]">
          <div
            class="card relative rounded-[0.25rem] border-[0.0625rem] border-[#E4E4E7]
                   overflow-hidden cursor-pointer"
            v-for="(item, index) in cameraList"
            :key="item.id"
            @mouseover="handlerMouseover(index)"
            @mouseleave="handlerMouseleave"
          >
            <!-- date -->
            <div
              class="box-time absolute top-[0.6875rem] right-[0.625rem]
                     text-[0.75rem] text-white z-10"
            >
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
            <div class="box-mask absolute bottom-0 left-0 w-full h-[3.625rem] z-[5]" />

            <!-- image -->
            <img
              src="@/assets/images/test1.png"
              alt=""
              class="absolute inset-0 w-full h-full object-cover"
            />

            <!-- hover layer -->
            <div
              class="absolute inset-0 bg-[rgba(0,0,0,0.7)]
                     flex items-center justify-center gap-[2.875rem] z-[12]"
              v-show="isHoverCount === index"
            >
              <div
                class="w-[4.5rem] h-[4.5rem] rounded-full bg-[rgba(126,126,126,0.5)]
                       flex items-center justify-center cursor-pointer"
                @click.stop="handlerPreview(index)"
              >
                <SvgIcon width="2.125rem" height="2.125rem" color="#FFFFFFE5" icon="eyes" />
              </div>

              <div
                class="w-[4.5rem] h-[4.5rem] rounded-full bg-[rgba(126,126,126,0.5)]
                       flex items-center justify-center cursor-pointer"
                @click.stop="handlerPlayBack(index)"
              >
                <SvgIcon width="2.125rem" height="2.125rem" color="#FFFFFFE5" icon="arrow-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchPhoto from "@/components/SearchPhoto.vue";
import { ref, inject, computed } from "vue";
import { useRouter } from "vue-router";

const { VideoStore } = inject("store");
const router = useRouter();

const isHoverCount = ref(-1);

// camera list
const cameraList = ref(
  Array.from({ length: 11 }).map((_, i) => ({
    id: i + 1,
    name: `Office ${1 + i}F`,
    desc: "192.168.200.16",
  }))
);

const isUploadImage = computed(() => VideoStore.state.isUploadImage);

// hover
const handlerMouseover = (index) => {
  isHoverCount.value = index;
};
const handlerMouseleave = () => {
  isHoverCount.value = -1;
};

// actions
const handlerPreview = () => {
  VideoStore.methods.setPreview(true, "");
};

const handlerPlayBack = (index) => {
  router.push(`/Playback/${index}`);
};
</script>

<style lang="scss" scoped>
/* ✅ 自适应卡片宽高核心 */
.card {
  width: 100%;
  aspect-ratio: 16 / 9; /* 卡片高度随宽度缩放 */
  background: #ccc;
}

.box-time {
  display: inline-flex;
  padding: 0.25rem 0.6258rem 0.3314rem 0.3569rem;
  align-items: center;
  border-radius: 0.2543rem;
  background: rgba(32, 36, 47, 0.25);
  backdrop-filter: blur(0.1875rem);
}

.box-mask {
  border-radius: 0 0 0.25rem 0.25rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 13.87%,
    #13161e 92.13%
  );
}
</style>
