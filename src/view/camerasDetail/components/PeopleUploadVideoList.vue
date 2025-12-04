<template>
    <div class="w-[113.375rem] flex items-start">
        <div class="mt-[4.8125rem] pl-[1.25rem] flex-shrink-0 w-[18.875rem]" v-if="isUploadImage">
            <SearchPhoto />
        </div>
        <div class="flex-1 min-w-0">
            <div
                class="mt-[2.125rem] pl-[1.25rem] mb-[1.125rem] text-[#09090B] text-[1rem] font-normal font-['Roboto'] tracking-tight">
                93 Results Found</div>
            <div class=" pl-[1.25rem] h-[37.5rem] fhd:h-[47.8125rem] qhd:h-[47.8125rem] uhd:h-[47.8125rem] overflow-y-auto overflow-hidden scroll"
                :class="isUploadImage ? 'pr-[1.5rem]' : 'pr-[1.5rem]'">
                <div class="box " :style="{
                    gridTemplateColumns: `repeat(auto-fill, minmax(22.1875rem, 1fr)`
                }">
                    <div id="video-hover"
                        class="w-full h-[15.375rem] rounded-[0.25rem] border-[0.0625rem] border-[#E4E4E7] overflow-hidden relative"
                        v-for="(item, index) in cameraList" :key="index" @mouseover="handlerMouseover(index)"
                        @mouseleave="handlerMouseleave(index)">
                        <!-- date -->
                        <div class="box-time absolute top-[0.6875rem] right-[0.625rem] text-[0.75rem] text-white">
                            10/23/25,
                            7:35
                            AM</div>
                        <!-- title -->
                        <div class="absolute bottom-[0.75rem] left-[1rem] z-[10]">
                            <div
                                class="w-28 h-5 justify-start text-white text-[1rem] font-normal font-['Roboto'] [text-shadow:_0rem_0.25rem_0.75rem_rgb(0_0_0_/_0.60)]">
                                Office 1F</div>
                            <div
                                class="mt-[0.3125rem] justify-start text-white text-[0.875rem] font-normal font-['Roboto'] [text-shadow:_0rem_0.25rem_0.75rem_rgb(0_0_0_/_0.60)] ">
                                192.168.200.16</div>
                        </div>
                        <!-- mask -->
                        <div class="box-mask absolute bottom-0 left-0 w-full h-[3.625rem] ">

                        </div>
                        <div class="w-full h-full bg-[#ccc]">
                            <img src="@/assets/images/test1.png" alt="" class="w-full h-full object-cover">
                        </div>
                        <!-- hover -->
                        <div class="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] flex items-center justify-center gap-[2.875rem] z-[12]"
                            v-show="isHoverCount == index">
                            <div class="w-[4.5rem] h-[4.5rem] rounded-full bg-[rgba(126,126,126,0.5)] flex items-center justify-center cursor-pointer"
                                @click="handlerPreview(index)">
                                <SvgIcon width="2.125rem" height="2.125rem" color="#FFFFFFE5" icon="eyes" />
                            </div>
                            <div
                                class="w-[4.5rem] h-[4.5rem] rounded-full bg-[rgba(126,126,126,0.5)] flex items-center justify-center cursor-pointer"
                                @click="handlerPlayBack(index)">
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
import SearchPhoto from '@/components/SearchPhoto.vue'
import { ref, onMounted, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
const { VideoStore } = inject('store')
const router = useRouter()
const isFocus = ref(false)
const isHoverCount = ref(-1)
// 模拟接口返回的摄像头列表
const cameraList = ref(
    Array.from({ length: 11 }).map((_, i) => ({
        id: i + 1,
        name: `Office ${1 + i}F`,
        desc: '192.168.200.16'
    }))
)
const isUploadImage = computed(() => VideoStore.state.isUploadImage)
const handlerMouseover = (index) => {
    isFocus.value = true
    isHoverCount.value = index
}
const handlerMouseleave = () => {
    isFocus.value = false
    isHoverCount.value = -1
}
const handlerPlayBack= (index) => {
    router.push(`/Playback/${index}`)
}
const handlerPreview = (index) => {
    VideoStore.methods.setPreview(true, "") //boolean string
}
const initHoverElement = () => {
    const dropdown = document.getElementById("video-hover");
    document.addEventListener("click", function (event) {
        // 如果点击的不是 dropdown 本身，也不是它的子元素
        if (!dropdown.contains(event.target)) {
            isFocus.value = false
        }
    });
}
onMounted(() => {
})
</script>
<style lang="scss" scoped>
.box {
    display: grid;
    grid-auto-rows: 1fr;
    gap: 0.75rem;
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
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 13.87%, #13161E 92.13%);
}
</style>