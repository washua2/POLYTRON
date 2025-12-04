<template>
    <div class="relative w-[6.75rem] h-[2.3125rem] "
        ref="rootRef">
        <!-- 输入框 -->
        <div class="w-[6.75rem] h-[2.3125rem] px-[1rem] rounded-[0.5rem] border-[0.0625rem] border-[#E1E4EA] flex items-center  cursor-pointer" @click="open = !open">
            <SvgIcon width="1rem" height="1rem" color="#09090B" icon="time-select"
                class="" />
            <span class="text-[0.875rem] text-[#09090B] ml-[0.5rem] ">{{ modelValue }}</span>
        </div>

        <!-- 下拉框 -->
        <div v-if="open"
            class="absolute z-50 mt-2 bg-white rounded-lg shadow-lg border w-full max-h-48 overflow-y-auto p-2 scroll">
            <div v-for="t in times" :key="t" class="px-3 py-2 rounded text-[0.875rem] text-[#09090B] cursor-pointer hover:bg-gray-100"
                @click="selectTime(t)">
                {{ t }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
    modelValue: { type: String, default: "00:00" },
});
const emit = defineEmits(["update:modelValue"]);

const open = ref(false);

// 绑定组件根节点
const rootRef = ref(null);

// 生成时间
const times = computed(() => {
    const arr = [];
    for (let h = 0; h < 24; h++) {
        for (let m of [0, 15, 30, 45]) {
            arr.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
        }
    }
    return arr;
});

const selectTime = (t) => {
    emit("update:modelValue", t);
    open.value = false;
};

const handleClickOutside = (e) => {
    if (rootRef.value && !rootRef.value.contains(e.target)) {
        open.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>
