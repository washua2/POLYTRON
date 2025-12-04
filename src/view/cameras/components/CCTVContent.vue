<template>
        <div
            class="w-[113.375rem] pl-[1.25rem] h-[37.5rem] ipad:h-[60rem] fhd:h-[47.8125rem] qhd:h-[47.8125rem] uhd:h-[47.8125rem] overflow-y-auto overflow-hidden scroll">
            <div class="box w-[110.25rem]" :style="{
                gridTemplateColumns: `repeat(4, 1fr)`
            }">
                <div class="w-[26.9375rem] h-[15.375rem] rounded-[0.25rem] border-[0.0625rem] border-[#E4E4E7] relative cursor-pointer"
                    v-for="(item, index) in cameraList" :key="index" @click="handlerDetail(item.id)">
                    <!-- date -->
                    <div class="box-time absolute top-[0.6875rem] right-[0.625rem] text-[0.75rem] text-white">10/23/25,
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
                </div>
            </div>
        </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
// 模拟接口返回的摄像头列表
const cameraList = ref(
    Array.from({ length: 11 }).map((_, i) => ({
        id: i + 1,
        name: `Office ${1 + i}F`,
        desc: '192.168.200.16'
    }))
)
const handlerDetail = (id) => {
    router.push(`/CamerasDetail/${id}`)
}
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