<template>
  <div class="relative inline-flex items-center">
    <SvgIcon
      width="1.5rem"
      height="1.5rem"
      color="#FFFFFF"
      icon="video-4"
      class="cursor-pointer"
      @click="openPicker"
    />

    <!-- 隐藏的 input，用来挂 Datepicker -->
    <input
      ref="inputRef"
      type="text"
      readonly
      class="absolute opacity-0 pointer-events-none w-[1.5rem] h-[3.375rem]"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { Datepicker } from "flowbite-datepicker";

const props = defineProps({
  modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref(null);
let picker = null;

function formatDate(d) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = d.getFullYear();
  return `${mm}/${dd}/${yy}`;
}

function onChangeDate(e) {
  const d = e.detail?.date;
  if (!d) return;
  emit("update:modelValue", formatDate(d));
}
const openStart = () => {

  // 弹层元素
  const el = picker.pickerElement;
  if (el) {
    el.style.top = "120px";
    el.style.left = "40px";
  }
};

onMounted(() => {
  picker = new Datepicker(inputRef.value, {
    autoselectToday: false,
  });

  inputRef.value.addEventListener("changeDate", onChangeDate);

  // 如果有默认值，初始化 UI
  if (props.modelValue) {
    picker.setDate(props.modelValue);
  }
  
});


// 父组件修改 modelValue 时同步 UI
watch(
  () => props.modelValue,
  (v) => {
    if (!picker) return;
    if (!v) {
      picker.setDate(null);
    } else {
      picker.setDate(v);
    }
  }
);

// ✅ 点击图标打开 datepicker
function openPicker() {
  if (!picker) return;

  // flowbite datepicker 有 show() 方法
  if (picker.show) {
    picker.show();
  } else {
    // 兜底：触发 focus
    inputRef.value?.focus();
    inputRef.value?.click();
  }
}

onBeforeUnmount(() => {
  inputRef.value?.removeEventListener("changeDate", onChangeDate);
  picker?.destroy?.();
  picker = null;
});
</script>
<style lang="scss" scoped>

</style>