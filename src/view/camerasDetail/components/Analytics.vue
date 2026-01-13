<template>
    <div>
        <div class="pl-[1.875rem]">
            <div class="w-full h-[0.0625rem]  bg-[rgba(225,228,234,1)] mt-[1.9375rem]"></div>
        </div>
        
        <div class="flex items-center justify-between pl-[1.875rem] mt-[1.375rem]">
            <div class="justify-start text-[#09090B] text-[1.25rem] font-['medium'] leading-6 tracking-tight">People
                Counting</div>
            <div class="flex items-center gap-[0.75rem]">
                <div class="relative">

                <div
                    class="w-[5.9375rem] h-[3.25rem] bg-white rounded-lg border-[0.0625rem] border-[#E1E4EA] flex items-center justify-center cursor-pointer"
                     @click="isShowDateModel=!isShowDateModel">
                    <div class="justify-start text-[#09090B] text-[0.875rem] font-normal font-['Roboto'] leading-5">Time
                        Filter</div>
                    
                </div>
                    <div class=" absolute top-[-22.5rem] left-[-9.375rem] z-[12]" v-show="isShowDateModel">
                        <DateModel @handlerDateClose="isShowDateModel = false" @apply="handlerDateApply" />
                    </div>
                </div>
                <div
                    class="w-[7.5625rem] h-[3.25rem] rounded-[0.5rem] flex items-center justify-center gap-[0.75rem] cursor-pointer"
                    :class="isEditLines?'bg-[#1C64F2]':'bg-[#fff] border-[0.0625rem] border-[#E1E4EA]'"
                     @click="isEditLines=!isEditLines">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.125rem" viewBox="0 0 20 20" fill="none" >
                        <circle cx="16.8415" cy="3.15789" r="2.50789" :stroke="isEditLines?'white':'#000' " stroke-width="1.3" />
                        <circle cx="3.15789" cy="16.842" r="2.50789" :stroke="isEditLines?'white':'#000' " stroke-width="1.3" />
                        <line x1="15.1979" y1="4.67007" x2="4.67159" y2="15.1964" :stroke="isEditLines?'white':'#000' " stroke-width="1.3" />
                    </svg>
                    <div class="justify-start text-white text-[0.875rem] font-normal font-['Roboto'] leading-5" 
                    :class="isEditLines?'text-white':'text-[#000]'"
                    >Edit
                        Lines </div>
                </div>
                <div
                    class="w-[3.25rem] h-[3.25rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] flex items-center justify-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path
                            d="M18.3333 18.3332C18.5764 18.3332 18.8096 18.4298 18.9815 18.6017C19.1534 18.7736 19.25 19.0068 19.25 19.2499C19.25 19.493 19.1534 19.7262 18.9815 19.8981C18.8096 20.07 18.5764 20.1666 18.3333 20.1666H3.66667C3.42355 20.1666 3.19039 20.07 3.01849 19.8981C2.84658 19.7262 2.75 19.493 2.75 19.2499C2.75 19.0068 2.84658 18.7736 3.01849 18.6017C3.19039 18.4298 3.42355 18.3332 3.66667 18.3332H18.3333ZM11 1.83691C11.2431 1.83691 11.4763 1.93349 11.6482 2.1054C11.8201 2.27731 11.9167 2.51047 11.9167 2.75358V13.826L16.3075 9.43516C16.4723 9.27045 16.6937 9.17468 16.9265 9.16733C17.1594 9.15997 17.3864 9.24157 17.5613 9.39556C17.7361 9.54953 17.8458 9.76433 17.868 9.99628C17.8902 10.2282 17.8232 10.4599 17.6807 10.6442L17.6037 10.7304L11.6444 16.6933C11.4867 16.8513 11.2767 16.9463 11.054 16.9605C10.8312 16.9746 10.6109 16.907 10.4344 16.7703L10.3482 16.6942L4.3945 10.7506C4.22948 10.5859 4.13338 10.3646 4.12577 10.1316C4.11816 9.8986 4.19961 9.67146 4.35354 9.49639C4.50747 9.32132 4.72232 9.21147 4.95437 9.1892C5.18643 9.16693 5.41825 9.2339 5.60267 9.3765L5.68883 9.45258L10.0833 13.8379V2.75358C10.0833 2.51047 10.1799 2.27731 10.3518 2.1054C10.5237 1.93349 10.7569 1.83691 11 1.83691Z"
                            fill="#9298A3" stroke="white" stroke-width="0.4" />
                    </svg>
                </div>
            </div>
        </div>
        <!-- echart -->
        <div class="flex items-center gap-[3.75rem] pl-[1.875rem] mt-[1.75rem]">
            <div class="w-[53.9375rem] h-[11.25rem]">
                <div
                    class="justify-start text-[#52525B] text-[1.125rem] font-medium font-['Roboto'] leading-6 tracking-tight">
                    In Trends</div>
                <div id="in-trends" class="w-[53.9375rem] h-[9.375rem]">

                </div>
            </div>
            <div class="w-[53.9375rem] h-[11.25rem]">
                <div
                    class="justify-start text-[#52525B] text-[1.125rem] font-medium font-['Roboto'] leading-6 tracking-tight">
                    Out Trends</div>
                <div id="out-trends" class="w-[53.9375rem] h-[9.375rem]">

                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { renderChart } from '@/utils/echarts/InTrends'
import { renderOutChart } from '@/utils/echarts/outTrends'
import DateModel from '@/components/DateModel.vue'
const isShowDateModel = ref(false)
const isEditLines=ref(false)
const handlerDateApply = () => {
    isShowDateModel.value = false
}
onMounted(() => {
    renderChart('in-trends')
    renderOutChart('out-trends')
})
</script>