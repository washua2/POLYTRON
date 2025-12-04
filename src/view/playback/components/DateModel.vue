<template>
    <div class="w-[22rem] h-[21.6875rem] px-[1.25rem] pt-[1.625rem] bg-white box-time">
        <div class="justify-center text-[#09090B] text-base font-normal font-['Roboto'] capitalize">Date Range</div>
        <!-- START -->
        <div
            class="justify-start text-[#71717A] text-[0.875rem] font-normal font-['Roboto'] mt-[1.5rem] mb-[0.375rem] ml-[1rem]">
            Start</div>
        <div class="flex items-center gap-[1.25rem] mb-4">

            <!-- Start Date -->
            <div class="relative  ml-[1rem]">
                <div class="w-[9.5rem] h-[2.3125rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] overflow-hidden">
                    <SvgIcon width="1rem" height="1rem" color="#09090B" icon="date-select" class="absolute top-[0.625rem] left-[0.75rem]" />

                    <input ref="startDateRef" v-model="startDate" type="text" class="block w-full h-full pl-[2.375rem] pt-[0.5625rem] 
                 text-[#09090B] text-[0.875rem] font-['Roboto'] cursor-pointer" placeholder="Select date" style="box-shadow: none; border:none;"/>
                </div>
            </div>

            <!-- Start Time (Flatpickr) -->
            <CustomTimePicker v-model="startTime" />
        </div>

        <!-- END -->
        <div
            class="justify-start text-[#71717A] text-[0.875rem] font-normal font-['Roboto'] mt-[1.5rem] mb-[0.375rem] ml-[1rem]">
            From</div>
        <div class="flex items-center gap-[1.25rem] mb-4">

            <!-- End Date -->
            <div class="relative  ml-[1rem]">
                <div class="w-[9.5rem] h-[2.3125rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] overflow-hidden">
                    <SvgIcon width="1rem" height="1rem" color="#09090B" icon="date-select" class="absolute top-[0.625rem] left-[0.75rem]" />

                    <input ref="endDateRef" v-model="endDate" type="text" class="block w-full h-full pl-[2.375rem] pt-[0.5625rem] 
                 text-[#09090B] text-[0.875rem] font-['Roboto'] cursor-pointer" placeholder="Select date" style="box-shadow: none; border:none;"/>
                </div>
            </div>

            <!-- End Time (Flatpickr) -->
            <CustomTimePicker v-model="endTime" />
        </div>

        <div class="w-[19.5625rem] h-[0.0625rem] bg-[#E1E4EA] mt-[2.1875rem] mb-[1.5625rem]"></div>

        <div class="flex items-center justify-end gap-[1.5rem]">
            <button class="w-[6.75rem] h-[2.5rem] border-[0.0625rem] border-[#CCCFD4] rounded-[0.375rem] hover:bg-gray-100 flex items-center justify-center" @click="clear">
                <div class="justify-center text-[#09090B] text-[0.875rem] font-['medium']">Clear</div>
            </button>
            <button class="w-[6.75rem] h-[2.5rem] border-[0.0625rem] border-[#CCCFD4] rounded-[0.375rem] bg-[#1C64F2] hover:bg-blue-700 flex items-center justify-center" @click="apply">
                <div class="justify-center text-[#fff] text-[0.875rem] font-['medium']">Export</div>
            </button>
        </div>
    </div>
</template>

<script setup>
import CustomTimePicker from "@/components/CustomTimePicker.vue";
import { ref, onMounted } from "vue";
import { Datepicker } from "flowbite-datepicker";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

// Date Refs
const startDateRef = ref(null);
const endDateRef = ref(null);

// Time Refs
const startTimeRef = ref(null);
const endTimeRef = ref(null);

// Values
const startDate = ref("01/01/2023");
const startTime = ref("00:00");

const endDate = ref("02/04/2024");
const endTime = ref("24:00");

const emit = defineEmits(["apply","handlerDateClose"]);

onMounted(() => {
    // Flowbite 日期初始化
    new Datepicker(startDateRef.value, { autoselectToday: false });
    new Datepicker(endDateRef.value, { autoselectToday: false });
});

// 清空
function clear() {
    startDate.value = "";
    startTime.value = "00:00";
    endDate.value = "";
    endTime.value = "24:00";
    emit("handlerDateClose");
}

// 返回给父组件
function apply() {
    console.log("apply", startDate.value, startTime.value, endDate.value, endTime.value);
    emit("apply", {
        start: `${startDate.value} ${startTime.value}`,
        end: `${endDate.value} ${endTime.value}`,
    });
}
</script>

<style lang="scss" scoped>
.box-time {
    border-radius: 0.25rem;
    background: #FFF;
    box-shadow: 0 0.375rem 1.125rem 0 rgba(0, 7, 22, 0.25);
}
</style>
