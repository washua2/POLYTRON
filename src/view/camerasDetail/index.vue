<template>
    <!-- 滚动容器 -->
    <div ref="scrollWrapper"
        class="w-[114.375rem] max-h-[calc(100vh_-_4rem)] ipad:max-h-[calc(100svh-4rem)] pb-[1.875rem] overflow-y-auto overflow-x-hidden scroll relative">
        <div class="w-[113.125rem]">
            <!-- main -->
            <div class="pt-[1.875rem] pl-[1.875rem] relative flex items-start gap-[23.75rem]">
                <div class="w-[3.125rem] h-[3.125rem] rounded-full border-[0.0625rem] border-[#C9CDD3] flex items-center justify-center cursor-pointer"
                    @click="handlerBack">
                    <SvgIcon width="0.875rem" height="1.25rem" color="#09090B" icon="arrow-left" />
                </div>
                <div class="flex items-start gap-[1.3125rem]">
                    <!-- video -->
                    <div class="w-[60.4375rem] h-[34.6875rem] rounded-[1rem] bg-[#D9D9D9] overflow-hidden relative">
                        <!-- time -->
                        <div class="w-[11.625rem] h-[2.625rem] px-[1rem] pt-[0.125rem]
                          bg-[rgba(32,36,47,0.25)] rounded-[0.375rem] backdrop-blur-[0.1875rem]
                           flex items-center gap-[0.5rem] overflow-hidden absolute top-[1.75rem] right-[1.6875rem]">
                            <div class="w-[0.75rem] h-[0.75rem] bg-green-400 rounded-full"></div>
                            <div
                                class="justify-start text-white text-[1.125rem] font-normal font-['Roboto'] tracking-tight">
                                8:46:10 AM PDT
                            </div>
                        </div>
                        <!-- HQ -->
                        <div class="w-[4.6875rem] h-[2.375rem] rounded-[0.375rem] bg-[rgba(32,36,47,0.25)] flex items-center justify-center gap-[0.625rem] 
                     absolute bottom-[1.75rem] left-[1.75rem] overflow-hidden">
                            <div
                                class="justify-start text-white text-[1rem] font-normal font-['Roboto'] tracking-tight">
                                HQ
                            </div>
                            <div class="w-[0.875rem] h-[0.875rem] flex items-center justify-center">
                                <SvgIcon width="0.75rem" height="0.5rem" color="#B9B9B9" icon="arrow-top" />
                            </div>
                        </div>
                        <!-- video -->
                        <div class="w-full h-full">
                            <img src="@/assets/images/test1.png" class="w-full h-full object-cover" alt="" />
                        </div>
                    </div>
                    <!-- control -->
                    <div
                        class="w-[4.25rem] h-[24.375rem] pt-[1.625rem] rounded-[0.5rem] bg-white box flex flex-col items-center gap-[2.125rem] overflow-hidden">
                        <SvgIcon v-for="(btn, index) in controlList" :key="btn.id" width="1.75rem" height="1.75rem"
                            :color="btn.color" :icon="btn.icon" class="cursor-pointer"
                            @click="handleControlClick(btnm, index)" />
                    </div>
                </div>
            </div>

            <!-- setting -->
            <div class="flex items-center pl-[1.875rem] mt-[1.75rem] justify-between">
                <!-- title -->
                <div class="flex flex-col gap-[0.4375rem]">
                    <div class="justify-start text-[#09090B] text-[1.25rem] font-['medium']">Office 3F 306</div>
                    <div class="justify-start text-[#52525B] text-[1rem] font-['light']">192.168.200.29</div>
                </div>
                <!-- model -->
                <div class="flex items-center gap-[1.875rem]">
                    <div v-for="(item, index) in modeList" :key="item.id" @click="activeMode = index" class="w-[3.875rem] h-[3.875rem] py-[0.625rem] px-[0.75rem] rounded-[0.5rem]
           flex flex-col justify-center items-center gap-[0.25rem] cursor-pointer"
                        :class="activeMode === index ? 'bg-[#1C64F2]' : 'bg-white'">
                        <SvgIcon width="1.25rem" height="1.25rem" :color="activeMode === index ? '#FFFFFF' : '#09090B'"
                            :icon="activeMode === index ? item.iconActive : item.icon" />
                        <div class="justify-start text-[0.75rem] font-['medium']"
                            :class="activeMode === index ? 'text-white' : 'text-[#09090B]'">
                            {{ item.label }}
                        </div>
                    </div>
                </div>

                <!-- setting -->
                <div
                    class="w-[3.875rem] h-[3.875rem] py-[0.625rem] px-[0.75rem] rounded-[0.5rem] bg-white flex flex-col justify-center items-center gap-[0.25rem]">
                    <SvgIcon width="1.25rem" height="1.25rem" color="#09090B" icon="model-7" />
                    <div class="justify-start text-[#09090B] text-[0.75rem] font-['medium']">Settings</div>
                </div>
            </div>
            <!----------------------------- change -------------------- -->
            <div v-if="activeMode == 0 || activeMode == 1">
                <!-- date && Heatmaps && Clips-->
                <div class="w-[111.25rem] h-[4.875rem] pl-[1.625rem] pt-[1.625rem] pb-[1.625rem] pr-[1.875rem] ml-[1.875rem] mt-[1.75rem] rounded-[0.375rem] bg-[#F4F5F6]
                 flex items-center justify-between">
                    <div class=" relative">
                        <SvgIcon width="1.625rem" height="1.625rem" :icon="isShowDateModel?'date-detail-active':'date-detail'" class=" cursor-pointer" @click="isShowDateModel = !isShowDateModel" />
                        <div class=" absolute bottom-[2.625rem] left-[-1.625rem] z-[999]" v-show="isShowDateModel">
                            <DateModel @handlerDateClose="isShowDateModel = false" />
                        </div>
                    </div>
                    <div id="clips" class="flex items-center gap-[4.25rem]">
                        <div class="justify-start text-[#09090B] text-[1.125rem] font-['medium']">Heatmaps</div>
                        <div class="relative">
                            <div class="flex items-center gap-[0.75rem] cursor-pointer" @click="handlerClips">
                                <div class="justify-start text-[#09090B] text-[1.125rem] font-['medium']">Clips</div>
                                <SvgIcon width="0.75rem" height="0.75rem" color="#000000" icon="arrow-bottom"
                                    class=" transition-all duration-200 ease-in-out"
                                    :class="isClipsModel ? 'rotate-180' : 'rotate-0'" />
                            </div>
                            <div class=" absolute top-[2.5rem] left-[-6.25rem] z-[9999]" v-show="isClipsModel">
                                <ClipsModel />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full">
                    <!-- Today / groups -->
                    <VideoList v-if="activeMode == 0" />
                    <MotionEmpty v-else-if="activeMode == 1" />
                </div>
            </div>
            <!-- people && Vehicle && Archive-->
            <div v-if="activeMode == 2 || activeMode == 3 || activeMode == 4">
                <People :activeMode="activeMode" />
            </div>
            <!-- ------------------------------------------------------------- -->
        </div>
        <!-- Back to Top：距离底部一定距离才显示 -->
        <transition
    name="fade-scale"
    appear
  >
    <div
      v-show="showBackTop"
      class="fixed bottom-[2.4375rem] left-1/2 ml-[-5rem] z-[99] flex justify-center"
    >
      <div
        class="w-[13.125rem] h-[4.375rem] p-[0.5rem] rounded-full bg-white flex items-center
               justify-start gap-[1.25rem] cursor-pointer shadow-custom"
        @click="scrollToTop"
      >
        <SvgIcon width="3.375rem" height="3.375rem" color="#09090B" icon="back-top" />
        <div class="text-[#09090B] text-[1.25rem] font-['Roboto']">Back to Top</div>
      </div>
    </div>
  </transition>
    </div>
</template>

<script setup>
import VideoList from "@/components/videoList.vue";
import MotionEmpty from "./components/MotionEmpty.vue";
import ClipsModel from "./components/ClipsModel.vue";
import People from "./components/People.vue";
import DateModel from "@/components/DateModel.vue";
import { ref, onMounted, onBeforeUnmount, inject, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const scrollWrapper = ref(null);
const showBackTop = ref(false);
const controlIndex = ref(0)
const isClipsModel = ref(false)
const isShowDateModel = ref(false)
const controlList = [
    { id: 1, icon: "control-1", color: "#6B717D" },
    { id: 2, icon: "control-2", color: "#6B717D" },
    { id: 3, icon: "control-3", color: "#6B717D" },
    { id: 4, icon: "control-4", color: "#6B717D" },
    { id: 5, icon: "control-5", color: "#6B717D" },
    { id: 6, icon: "control-6", color: "#6B717D" }
];
const modeList = [
    { id: 1, iconActive: "model-1-active", icon: "model-1", label: "History" },
    { id: 2, iconActive: "model-2-active", icon: "model-2", label: "Motion" },
    { id: 3, iconActive: "model-3-active", icon: "model-3", label: "People" },
    { id: 4, iconActive: "model-4-active", icon: "model-4", label: "Vehicle" },
    { id: 5, iconActive: "model-5-active", icon: "model-5", label: "Archive" },
    { id: 6, iconActive: "model-6-active", icon: "model-6", label: "Analytics" }
];

// 默认选中
const activeMode = ref(0);

// 显示下拉框
const handlerClips = () => {
    isClipsModel.value = !isClipsModel.value
}

// 点击某个控制按钮
const handleControlClick = (btn, index) => {
    if (controlIndex.value == index) return
    controlIndex.value = index
    console.log("click control:", btn.id, btn.icon);
};


// 监听滚动：距离底部小于 200px 时显示 Back to Top
const handleScroll = () => {
    const el = scrollWrapper.value;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
    showBackTop.value = distanceToBottom <= 10; // 阈值
};

// 回到顶部
const scrollToTop = () => {
    const el = scrollWrapper.value;
    if (!el) return;
    el.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};
const handlerBack = () => {
    router.back()
}
const initHoverElement = () => {
    if (activeMode.value !== 0 && activeMode.value !== 1) return
    const dropdownclips = document.getElementById("clips");
    document.addEventListener("click", function (event) {
        // 如果点击的不是 dropdown 本身，也不是它的子元素
        if (!dropdownclips.contains(event.target)) {
            isClipsModel.value = false
        }
    });
}

onMounted(() => {
    initHoverElement()
    if (scrollWrapper.value) {
        scrollWrapper.value.addEventListener("scroll", handleScroll);
    }
});

onBeforeUnmount(() => {
    if (scrollWrapper.value) {
        scrollWrapper.value.removeEventListener("scroll", handleScroll);
    }
});
</script>

<style lang="scss" scoped>
.box {
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: 0 0.125rem 0.75rem 0 rgba(0, 7, 22, 0.15);
}
/* 进入状态 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.25s ease;
}

/* 初始状态：透明 + 缩小 */
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

/* 结束状态：正常显示 */
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* 阴影补充类 */
.shadow-custom {
  box-shadow: 0 0.125rem 0.75rem 0 rgba(0, 7, 22, 0.25);
}
</style>
