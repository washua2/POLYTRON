<template>
    <div class="w-[11.875rem] h-[18.4375rem] rounded-[0.375rem] bg-white py-[0.5rem]"
        style="box-shadow:0 6px 18px 0 rgba(0, 7, 22, 0.25)">
        <div v-for="item in timeOptions" :key="item.value"
            class="h-[2.5rem] pl-[1.125rem] flex items-center text-[1rem] text-[#09090B] cursor-pointer select-none"
            :class="item.value === activeValue ? 'bg-[#F4F5F6]' : ''" @click="handlerActive(item.value)">
            <!-- 左侧勾选 -->
            <span class="w-4 mr-[0.75rem] mt-[0.125rem] flex justify-center">
                <SvgIcon v-show="item.value === activeValue" width="0.75rem" height="0.75rem" color="#1C64F2"
                    icon="hook" />
            </span>
            <!-- 文本 -->
            <span>{{ item.label }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const emit = defineEmits(['changeTime'])
const timeOptions = [
    { label: "24 Hours", value: "24h" },
    { label: "1 Hour", value: "1h" },
    { label: "10 Minutes", value: "10m" },
    { label: "5 Minutes", value: "5m" },
    { label: "1 Minute", value: "1m" },
    { label: "20 Seconds", value: "20s" },
    { label: "Timelapse", value: "timelapse" }
];

// 默认选中“1 Hour”
const activeValue = ref("1h");

const handlerActive = (value) => {
    if (activeValue.value === value) return;
    activeValue.value = value;
    emit('changeTime', value)
}
</script>
