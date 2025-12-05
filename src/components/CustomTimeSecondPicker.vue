<template>
    <div class="relative w-[6.75rem] h-[2.3125rem]" ref="rootRef">
        <!-- 输入框 -->
        <div class="w-[6.75rem] h-[2.3125rem] px-[1rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] flex items-center cursor-pointer" @click="open = !open">
            <SvgIcon width="1rem" height="1rem" color="#09090B" icon="time-select" />
            <span class="text-[0.875rem] text-[#09090B] ml-[0.5rem] ">{{ modelValue }}</span>
        </div>

        <!-- 下拉框 -->
        <div v-if="open" class="absolute z-50 mt-2 bg-white rounded-lg shadow-lg border w-full max-h-48 p-2">
            <div class="grid grid-cols-3">
                <!-- 小时选择 -->
                <div class="flex flex-col items-center overflow-y-auto overflow-x-hidden h-[11.25rem] box-scroll">
                    <div v-for="h in hours" :key="h" :class="['px-3 py-2 text-center cursor-pointer', selectedHour === h ? 'bg-blue-100' : 'hover:bg-gray-100']" @click="selectHour(h)">
                        {{ h }}
                    </div>
                </div>

                <!-- 分钟选择 -->
                <div class="flex flex-col items-center overflow-y-auto overflow-x-hidden h-[11.25rem] box-scroll">
                    <div v-for="m in minutes" :key="m" :class="['px-3 py-2 text-center cursor-pointer', selectedMinute === m ? 'bg-blue-100' : 'hover:bg-gray-100']" @click="selectMinute(m)">
                        {{ m }}
                    </div>
                </div>

                <!-- 秒选择 -->
                <div class="flex flex-col items-center overflow-y-auto overflow-x-hidden h-[11.25rem] box-scroll">
                    <div v-for="s in seconds" :key="s" :class="['px-3 py-2 text-center cursor-pointer', selectedSecond === s ? 'bg-blue-100' : 'hover:bg-gray-100']" @click="selectSecond(s)">
                        {{ s }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
    modelValue: { type: String, default: "00:00:00" },
});
const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const rootRef = ref(null);  // 根元素引用

// 定义时、分、秒的数组
const hours = computed(() => {
    const arr = [];
    for (let h = 0; h < 24; h++) {
        arr.push(String(h).padStart(2, '0'));
    }
    return arr;
});

const minutes = computed(() => {
    const arr = [];
    for (let m = 0; m < 60; m++) {
        arr.push(String(m).padStart(2, '0'));
    }
    return arr;
});

const seconds = computed(() => {
    const arr = [];
    for (let s = 0; s < 60; s++) {
        arr.push(String(s).padStart(2, '0'));
    }
    return arr;
});

// 当前选中的时、分、秒
const selectedHour = ref(null);
const selectedMinute = ref(null);
const selectedSecond = ref(null);

// 选择小时
const selectHour = (h) => {
    selectedHour.value = h;
    emitTimeUpdate();
};

// 选择分钟
const selectMinute = (m) => {
    selectedMinute.value = m;
    emitTimeUpdate();
};

// 选择秒
const selectSecond = (s) => {
    selectedSecond.value = s;
    emitTimeUpdate();
};

// 更新选中的时间
const emitTimeUpdate = () => {
    if (selectedHour.value && selectedMinute.value && selectedSecond.value) {
        const time = `${selectedHour.value}:${selectedMinute.value}:${selectedSecond.value}`;
        emit("update:modelValue", time);  // 将时间传递给父组件
        open.value = false; // 选择后关闭下拉框
    }
};

// 监听初始值的变化，自动填充小时、分钟、秒
watch(() => props.modelValue, (newValue) => {
    const [h, m, s] = newValue.split(':');
    selectedHour.value = h;
    selectedMinute.value = m;
    selectedSecond.value = s;
});

// 监听点击事件，点击外部关闭下拉框
const handleClickOutside = (e) => {
    if (rootRef.value && !rootRef.value.contains(e.target)) {
        open.value = false;
    }
};

// 在组件挂载时添加事件监听
onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

// 在组件销毁时移除事件监听
onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* 选择框的样式 */
.ipt[type="checkbox"] {
    outline: none;
    box-shadow: none;
}

/* 自定义滚动条样式 */
.box-scroll::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}

.box-scroll::-webkit-scrollbar-thumb {
    background-color: #b0bec5;
    border-radius: 3px;
}

.box-scroll::-webkit-scrollbar-thumb:hover {
    background-color: #90a4ae;
}

/* 选中时的高亮 */
.bg-blue-100 {
    background-color: #cce4ff;
}
</style>
