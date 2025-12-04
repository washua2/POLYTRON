<template>
    <div ref="root" class="relative">
        <!-- trigger -->
        <button type="button" @click="toggle" @blur="onBlur" class="w-full h-[2.3125rem] font-['light'] rounded-[0.5rem] border bg-white
             px-[1rem] pr-[2.25rem] text-[0.875rem] text-left text-[#09090B]
             outline-none transition flex items-center
             focus:ring-2 "
            :class="error ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 '" style="box-shadow: none;">
            <span :class="modelValue ? 'text-[#09090B]' : 'text-gray-400'">
                {{ selectedLabel || placeholder }}
            </span>

            <!-- arrow -->
            <SvgIcon width="0.75rem" height="0.75rem" color="#71717A" icon="arrow-down" :class="isOpen ? 'rotate-180' : 'rotate-0'"
                class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ease-in-out" />
        </button>

        <!-- dropdown panel -->
        <transition enter-active-class="transition duration-150 ease-out" enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <ul v-if="isOpen" class="absolute z-50 mt-2 w-full max-h-60 overflow-auto scroll
               rounded-[0.5rem] border border-gray-200 bg-white shadow-lg py-1">
                <li v-for="(opt, i) in options" :key="opt.value" @mouseenter="activeIndex = i" @click="choose(opt)"
                    class="cursor-pointer px-4 py-2 text-sm transition" :class="[
                        i === activeIndex ? 'bg-blue-50 text-blue-700' : 'text-[#09090B]',
                        opt.value === modelValue ? `font-['medium']` : `font-['light']`
                    ]">
                    {{ opt.label }}
                </li>

                <li v-if="!options.length" class="px-4 py-2 text-sm text-gray-400">
                    No options
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
    modelValue: [String, Number],
    options: { type: Array, default: () => [] }, // [{label, value}]
    placeholder: { type: String, default: "Please select" },
    error: { type: String, default: "" }
});

const emit = defineEmits(["update:modelValue", "blur"]);

const isOpen = ref(false);
const activeIndex = ref(-1);
const root = ref(null);

const selectedLabel = computed(() => {
    return props.options.find(o => o.value === props.modelValue)?.label || "";
});

function toggle() {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
        const idx = props.options.findIndex(o => o.value === props.modelValue);
        activeIndex.value = idx >= 0 ? idx : 0;
    }
}

function choose(opt) {
    emit("update:modelValue", opt.value);
    isOpen.value = false;
    emit("blur");
}

function onBlur() {
    // 让外部可以触发你的 validateField
    // 但不要立刻关闭（否则点击选项会先 blur）
    setTimeout(() => emit("blur"), 0);
}

function onClickOutside(e) {
    if (!root.value?.contains(e.target)) {
        if (isOpen.value) {
            isOpen.value = false;
            emit("blur");
        }
    }
}

onMounted(() => document.addEventListener("mousedown", onClickOutside));
onBeforeUnmount(() => document.removeEventListener("mousedown", onClickOutside));
</script>
